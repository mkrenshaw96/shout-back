require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const jwt = require('jsonwebtoken');
const getUser = require('./Middleware/getUser');

// THE BELOW IS FOR MULTIPLE FILES IN SCHEMA/ RESOLVERS FOLDER

// const path = require('path');

// THE UTILITY 

// const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
// const types = fileLoader(path.join(__dirname, './schema'));
// const res = fileLoader(path.join(__dirname, './resolvers'));
// const typeDefs = mergeTypes(types, { all: true });
// const resolvers = mergeTypes(res, { all: true });

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/resolvers');

const secret = process.env.JWT_SECRET;
const secret2 = process.env.JWT_SECRET2;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        db,
        secret,
        secret2,
        user: getUser()
    }
});

server.applyMiddleware({ app }); // app is from an existing express app

db.sequelize.sync();
app.use(require('express').json());
app.use(require('./Middleware/headers'));
app.use(getUser)
app.listen(process.env.PORT, () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));