require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const jwt = require('jsonwebtoken');
const { refreshTokens } = require('./auth');
db.sequelize.sync();

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/resolvers');

const secret = process.env.JWT_SECRET;
const secret2 = process.env.JWT_SECRET2;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => {
		return {
			db,
			secret,
			secret2,
			req,
			res
		};
	}
});

async function addUser(req, res, next) {
	const token = req.headers['x-token'];
	if (token) {
		try {
			const { id } = await jwt.verify(token, secret);
			req.user = id;
		} catch (err) {
			const refreshToken = req.headers['x-refresh-token'];
			const newTokens = await refreshTokens(token, refreshToken, db, secret, secret2);
			if (newTokens.token && newTokens.refreshToken) {
				res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
				res.set('x-token', newTokens.token);
				res.set('x-refresh-token', newTokens.refreshToken);
			}
			req.user = newTokens.user;
		}
	}
	next();
}

app.use(require('express').json());
app.use(addUser);
server.applyMiddleware({ app }); // app is from an existing express app
app.listen(process.env.PORT, () =>
	console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
);
