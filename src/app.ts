import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { ApolloServer} from 'apollo-server-express';
import errorMiddleware from "./middleware/errorMiddleware";
import { typeDefs } from "./utils/typeDefs/typeDef";
import { resolvers } from "./utils/resolvers/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'


class App {
  public express: Application
  public server: ApolloServer;


   constructor () {
    this.express = express();

    this.server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    })

    this.initialiseErrorHandling()
  }

  private initialiseMiddleWare(): void {
    this.express.use(helmet());
    this.express.use(morgan("dev"));

    this.express.use(compression());
    this.server.applyMiddleware({app: this.express, path: "/graphql", cors: true})
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  public async initialize(): Promise<void> {
    await this.server.start()
    this.initialiseMiddleWare();

  }
}

export default App;