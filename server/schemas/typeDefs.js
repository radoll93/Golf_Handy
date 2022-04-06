const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    rating: Int
  }

  type Score {
    _id: ID
    date: Date
    total: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveScore(titleEnglish: String, titleJapanese: String, score: Float!, mal_id: Int, genres: [String], image: String): User
    saveReview(titleEnglish: String, titleJapanese: String, score: Float!, mal_id: Int, genres: [String], image: String): User
    removeScore(mal_id: Int): User
    removeReview(mal_id: Int): User
    changePassword(password: String!): Auth
  }
`;

module.exports = typeDefs;
