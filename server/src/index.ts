import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { typeDefs } from "./shema/typeDefs.js";
import { resolvers } from "./resolvers/index.js";

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use(cors());
app.use(express.json());
app.use("/graphql", expressMiddleware(server));

app.listen({ port: 4000 }, () =>
    console.log(`Server running at http://localhost:4000/graphql`),
);
