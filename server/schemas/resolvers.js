const { User, Course } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('courses');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('courses');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    courses: async () => {
      return Course.find();
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return {token, user}
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveScore: async (parent, args, context ) => {
      if (context.user) {
   
      return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { courseScores: args }},
          { new: true, runValidators: true }
       )
      }
    },
    saveReview: async (parent, args, context ) => {
      if (context.user) {
   
      return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { courseReviews: args }},
          { new: true, runValidators: true }
       )
      }
    },
    removeScore: async (parent, {_id}, context ) => {
      if(context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { courseScores: { _id: _id } } }, //what is _id? need additional check
          { new: true }
          );
      }
    },
    removeReview: async (parent, {_id}, context ) => {
      if(context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { courseReviews: { _id: _id } } }, //what is _id? need additional check
          { new: true }
          );
      }
    },
    changePassword: async (parent, {password}, context ) => {
      if(context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { password: password },
          { new: true }
          );
      }
    },
  }
};

module.exports = resolvers;
