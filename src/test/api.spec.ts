import  request  from 'supertest-graphql'
import {  gql } from "apollo-server-express";
import App from '../app';
import { Response } from 'express';


let app : App

beforeAll( async () => {
    jest.setTimeout(30000)

    app = new App()
    app.initialize();
})

describe(('getStage query'),  () => {
    test("should get the correct Stage", async () => {
        const server = app.express
        const { response } : any = await request(server)
        .query(gql`
        query{
            getStage(stageName: "Delivery"){
                name 
                tasks {
                    taskName
                    completed
                }
                completed 
                completedTasks
        }}
        `)
        .expectNoErrors()

        expect(response.status).toEqual(200);
        expect(response._body.data.getStage).toMatchObject( [{
            "name": "Delivery",
            "tasks": [
                {
                    "taskName": "Release marketing website",
                    "completed": false
                },
                {
                    "taskName": "Release MVP",
                    "completed": false
                }
            ],
            "completed": false,
            "completedTasks": 0
        }])
    })

    test("should get the correct Task", async () => {
        const server = app.express
        const { response } : any = await request(server)
        .query(gql`
        query {
            getTask (taskName: "Release marketing website"){
                taskName
                completed
            }
        }
        `)
        .expectNoErrors()

        expect(response.status).toEqual(200)
        expect(response._body.data.getTask).toMatchObject([
            {
                "taskName": "Release marketing website",
                "completed": false
            }
        ])
    })


    test("should make task complete", async () => {
        const server = app.express
        const { response } : any = await request(server)
        .mutate(gql`
        mutation {
            completeTask (taskName: "Release marketing website"){
                taskName
                completed
            }
        }
        `)
        .expectNoErrors()

        expect(response.status).toEqual(200)
        expect(response._body.data.completeTask).toMatchObject([
            {
                "taskName": "Release marketing website",
                "completed": true
            }
        ])
    })

    test("should make stage complete once every task is complete", async () => {
        const server = app.express
         await request(server)
        .mutate(gql`
        mutation {
            completeTask (taskName: "Create roadmap"){
                taskName
                completed
            }
        }
        `)
        .expectNoErrors()

        await request(server)
        .mutate(gql`
        mutation {
            completeTask (taskName: "Competitor analysis"){
                taskName
                completed
            }
        }
        `)
        .expectNoErrors()

        const { response } : any = await request(server)
        .mutate(gql`
        mutation {
            completeStage(stageName: "Discovery"){
                name 
                tasks {
                    taskName
                    completed
                }
                completed 
                completedTasks
        }}
        `)

        expect(response._body.data.completeStage[0].completed).toBe(true)
        expect(response._body.data.completeStage[0].completedTasks).toBe(2)



    })

})



