const mongoose = require('mongoose')
const keys = require('./keys/keys')
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const express = require('express');
const http = require('http');
const typeDefs = require('./api/graphql/Schema/index')
const resolvers = require('./api/graphql/Resolver/index')
mongoose.connect(keys.URI,(error) => {
    if(error){
        console.log(error)
    }else{
      console.log("MongoDB Connected")
    }
})

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer()