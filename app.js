require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || '4000';
const Subject = require('./models/subjectModel');
const subjectRouter = require('./routes/subjectRouter')(Subject);
const Question = require('./models/questionModel');
const questionRouter = require('./routes/questionRouter')(Question);

const atlasUri = `mongodb+srv://express-server:${process.env.ATLAS_PASS}@cluster0.c0qpm.mongodb.net/aperture?retryWrites=true&w=majority`;
mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to AtlasDB');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/subjects', subjectRouter);
app.use('/api/questions', questionRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
