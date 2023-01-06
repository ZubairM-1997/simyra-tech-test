"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_graphql_1 = __importDefault(require("supertest-graphql"));
const apollo_server_express_1 = require("apollo-server-express");
const app_1 = __importDefault(require("../app"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    jest.setTimeout(30000);
    app = new app_1.default();
    app.initialize();
}));
describe(('getStage query'), () => {
    test("should get the correct Stage", () => __awaiter(void 0, void 0, void 0, function* () {
        const server = app.express;
        const { response } = yield (0, supertest_graphql_1.default)(server)
            .query((0, apollo_server_express_1.gql) `
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
            .expectNoErrors();
        expect(response.status).toEqual(200);
        expect(response._body.data.getStage).toMatchObject([{
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
            }]);
    }));
    test("should get the correct Task", () => __awaiter(void 0, void 0, void 0, function* () {
        const server = app.express;
        const { response } = yield (0, supertest_graphql_1.default)(server)
            .query((0, apollo_server_express_1.gql) `
        query {
            getTask (taskName: "Release marketing website"){
                taskName
                completed
            }
        }
        `)
            .expectNoErrors();
        expect(response.status).toEqual(200);
        expect(response._body.data.getTask).toMatchObject([
            {
                "taskName": "Release marketing website",
                "completed": false
            }
        ]);
    }));
    test("should make task complete", () => __awaiter(void 0, void 0, void 0, function* () {
        const server = app.express;
        const { response } = yield (0, supertest_graphql_1.default)(server)
            .mutate((0, apollo_server_express_1.gql) `
        mutation {
            completeTask (taskName: "Release marketing website"){
                taskName
                completed
            }
        }
        `)
            .expectNoErrors();
        expect(response.status).toEqual(200);
        expect(response._body.data.completeTask).toMatchObject([
            {
                "taskName": "Release marketing website",
                "completed": true
            }
        ]);
    }));
    test("should make stage complete once every task is complete", () => __awaiter(void 0, void 0, void 0, function* () {
        const server = app.express;
        yield (0, supertest_graphql_1.default)(server)
            .mutate((0, apollo_server_express_1.gql) `
        mutation {
            completeTask (taskName: "Create roadmap"){
                taskName
                completed
            }
        }
        `)
            .expectNoErrors();
        yield (0, supertest_graphql_1.default)(server)
            .mutate((0, apollo_server_express_1.gql) `
        mutation {
            completeTask (taskName: "Competitor analysis"){
                taskName
                completed
            }
        }
        `)
            .expectNoErrors();
        const { response } = yield (0, supertest_graphql_1.default)(server)
            .mutate((0, apollo_server_express_1.gql) `
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
        `);
        expect(response._body.data.completeStage[0].completed).toBe(true);
        expect(response._body.data.completeStage[0].completedTasks).toBe(2);
    }));
});
