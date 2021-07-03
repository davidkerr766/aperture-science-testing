const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionModel = new Schema(
  {
    Question: { type: Number },
    Label: { type: String },
    Type: { type: String },
    Required: { type: Boolean, default: false },
    Options: [{ label: String, value: String }],
  },
);

module.exports = mongoose.model('Question', questionModel);
