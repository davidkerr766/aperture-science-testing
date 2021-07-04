const mongoose = require('mongoose');

const { Schema } = mongoose;

const submissionModel = new Schema(
  {
    username: { type: String },
    date: { type: Date },
    userId: { type: String },
    responses: [{ question: String, value: String }],
  },
);

module.exports = mongoose.model('Submission', submissionModel);
