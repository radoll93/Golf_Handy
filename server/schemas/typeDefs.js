const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    userCourses: [Course]
  }

  type Course {
    _id: ID
    name: String
    par: Int
    courseReviews: [Review]
    courseScores: [Score]
  }

  type Review {
    _id: ID
    comment: String
    createdDate: Date
    rating: Float
    user_id: Int
  }

  type Score {
    _id: ID
    date: Date
    total: Int
    user_id: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user: User
    courses: [Course]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveScore(date: Date!, total: Int!, user_id: Int): User
    saveReview(comment: String, createdDate: Date, rating: Float!, user_id: Int): User
    removeScore(_id: Int): User
    removeReview(_id: Int): User
    changePassword(password: String!): Auth
  }
`;

module.exports = typeDefs;
