"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
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
    }

    type Mutation {
        completeTask(stageName: String, taskName: String): Task
        completeStage(stageName: String): Stage
    }
`;
