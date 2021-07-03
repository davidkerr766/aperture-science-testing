const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectModel = new Schema(
  {
    Username: { type: String },
    TestChamber: { type: String },
    DateOfBirth: { type: Date },
    TotalScore: { type: Number },
    Alive: { type: Boolean, default: true },
    Password: { type: String },
  },
);

module.exports = mongoose.model('Subject', subjectModel);
