const { Schema, model } = require('mongoose');


const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    rating: {
      type: Number,
      required: true
    }
    }
  );
  
  module.exports = reviewSchema;