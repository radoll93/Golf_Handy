const { Schema, model } = require('mongoose');

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

  const Course = model('Course', courseSchema);

  module.exports = Course;