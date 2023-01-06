import request from 'supertest-graphql'
import {  gql } from "apollo-server-express";
import App from '../app';


let app : App

beforeAll( async () => {
    jest.setTimeout(30000)

    app = new App()
    app.listen(4000)
})

describe(('getStage query'),  () => {
    test("should get the correct Stage", async () => {
        const { data } : any = await request(app)
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

        expect(data.getStage).toHaveLength(1)
    })
})



