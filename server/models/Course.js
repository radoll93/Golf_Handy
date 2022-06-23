const { Schema } = require('mongoose');

const scoreSchema = require('./Score')
const reviewSchema = require('./Review')

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    par: {
      type: Number,
      required: true
    },
    courseReviews: [reviewSchema],
    courseScores: [scoreSchema]
  }    
  );


  module.exports = courseSchema;