const { gql } = require('apollo-server-express');
module.exports = gql`
	# QUERYS
	type Query {
		getSingleUser(name: String!): User!
		allUsers: [User!]
		getAllPosts: [Post!]
		getMyFeed: MultiplePostResponse!
		allFollow: [Follow!]
	}

	# MUTATIONS
	type Mutation {
		createUser(name: String!, email: String!, username: String!, password: String!): RegisterResponse!
		createPost(text: String!): PostResponse!
		# uploadProfileImg(username: String!): User!
		loginUser(username: String!, password: String!): LoginResponse!
		followUser(them: String!, me: String!): Follow!
	}

	# TYPE DEFINITIONS
	type User {
		id: String!
		name: String!
		email: String!
		username: String!
		profilePicUrl: String
		createdAt: String!
		updatedAt: String!
	}

	type Post {
		id: String!
		text: String!
		user: User!
		userId: String
		location: String
		createdAt: String!
		updatedAt: String!
	}

	type Follow {
		id: String!
		followingUserId: String!
		userId: String!
	}

	type PostResponse {
		ok: Boolean!
		post: Post
		errors: [Error!]
	}

	type MultiplePostResponse {
		ok: Boolean!
		post: [Post!]
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
