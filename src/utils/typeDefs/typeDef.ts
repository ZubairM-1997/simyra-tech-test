import {  gql } from "apollo-server-express";

export const typeDefs = gql`
    type Task {
        taskName: String
        completed: Boolean
    }

    type Stage {
        name: String
        tasks: [Task]
        completed: Boolean
        completedTasks: Int
    }

    type Query {
        getStage(stageName: String): Stage
        getTask(taskName: String): Task
        getAllStages: [Stage]
    }

    type Mutation {
        completeTask(stageName: String, taskName: String): Task
        completeStage(stageName: String): Stage
    }
`