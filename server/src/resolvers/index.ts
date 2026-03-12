import { formResolvers } from "./formResolvers.js";
import { responseResolvers } from "./responseResolvers.js";

export const resolvers = {
    Query: {
        ...formResolvers.Query,
        ...responseResolvers.Query,
    },
    Mutation: {
        ...formResolvers.Mutation,
        ...responseResolvers.Mutation,
    },
};
