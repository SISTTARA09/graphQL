const { log } = require("console");
// get the server constructor
const { ApolloServer } = require("apollo-server");
///
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
// create a server
const server = new ApolloServer({ typeDefs, resolvers });
///
// decide witch port will running on
server.listen(4000);
// by default 4000
