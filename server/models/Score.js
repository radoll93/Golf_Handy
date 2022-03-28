const { Schema, model } = require('mongoose');

const scoreSchema = new Schema(
    {
      date: {
        type: Date,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  );
  
  module.exports = scoreSchema;