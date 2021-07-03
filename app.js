require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const atlasUri = `mongodb+srv://express-server:${process.env.ATLAS_PASS}@cluster0.c0qpm.mongodb.net/aperture?retryWrites=true&w=majority`;
mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log(err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to AtlasDB');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = { app };
