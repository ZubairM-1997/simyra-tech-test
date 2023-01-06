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
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const apollo_server_express_1 = require("apollo-server-express");
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const typeDef_1 = require("./utils/typeDefs/typeDef");
const resolvers_1 = require("./utils/resolvers/resolvers");
const apollo_server_core_1 = require("apollo-server-core");
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDef_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        });
    }
    initialiseMiddleWare() {
        this.express.use((0, helmet_1.default)());
        // this.express.use(cors());
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use((0, compression_1.default)());
        this.server.applyMiddleware({ app: this.express, path: "/graphql", cors: true });
    }
    initialiseErrorHandling() {
        this.express.use(errorMiddleware_1.default);
    }
    listen(port) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.start();
            this.initialiseMiddleWare();
            this.express.listen(port, () => {
                console.log(`App listening on port ${port}`);
            });
        });
    }
}
exports.default = App;
