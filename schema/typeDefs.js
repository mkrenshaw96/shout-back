const { gql } = require('apollo-server-express');
module.exports = gql`
  # USERS
  type User {
    id: String!
    name: String!
    email: String!
    username: String!
    profilePicUrl: String
    sessionToken: String!
    # posts: [Post!]
  }

  # POSTS
  type Post {
    id: String!
    text: String!
    userId: String
  }

  # QUERYS
  type Query {
    # USERS
    getSingleUser(name: String!): User!
    allUsers: [User!]

    # POSTS
    getAllPosts: [Post!]
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

  # MUTATIONS
  type Mutation {
    # USERS
    createUser(name: String!, email: String!, username: String!, password: String!): RegisterResponse!
    createPost(text: String!): Post!
    loginUser(username: String!, password: String!): LoginResponse!
  }

`;