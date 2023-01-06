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
    app.listen(4000);
}));
describe(('getStage query'), () => {
    test("should get the correct Stage", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield (0, supertest_graphql_1.default)(app)
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
        expect(data.getStage).toHaveLength(1);
    }));
});
