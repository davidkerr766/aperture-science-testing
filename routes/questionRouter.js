const express = require('express');

const routes = (Question) => {
  const questionRouter = express.Router();
  questionRouter.get('/', (req, res) => {
    Question.find((err, question) => {
      if (err) {
        return res.send(err);
      }
      return res.json(question);
    });
  });

  questionRouter.get('/:id', (req, res) => {
    Question.findById(req.params.id, (err, question) => {
      if (err) {
        return res.send(err);
      }
      return res.json(question);
    });
  });

  return questionRouter;
};

module.exports = routes;
