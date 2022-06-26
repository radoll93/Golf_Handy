const { Schema } = require('mongoose');

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
      user_id: {
        type: Number,
      },  
    },
  );
  
  module.exports = scoreSchema;