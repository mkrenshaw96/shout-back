const { gql } = require('apollo-server-express');
module.exports = gql`
	# QUERYS
	type Query {
		getSingleUser(name: String!): User!
		allUsers: [User!]
		getAllPosts: [Post!]
	}

	# MUTATIONS
	type Mutation {
		createUser(name: String!, email: String!, username: String!, password: String!): RegisterResponse!
		createPost(text: String!): PostResponse!
		loginUser(username: String!, password: String!): LoginResponse!
	}

	# TYPE DEFINITIONS
	type User {
		id: String!
		name: String!
		email: String!
		username: String!
		profilePicUrl: String
		sessionToken: String!
	}

	type Post {
		id: String!
		text: String!
		userId: String
	}

	type PostResponse {
		ok: Boolean!
		post: Post
		errors: [Error!]
	}

	type RegisterResponse {
		ok: Boolean!
		user: User
		errors: [Error!]
	}

	type LoginResponse {
		ok: Boolean!
		token: String
		refreshToken: String
		user: User
		errors: [Error!]
	}

	type Error {
		path: String!
		message: String
	}
`;
