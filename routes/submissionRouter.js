const express = require('express');

const routes = (Submission) => {
  const submissionRouter = express.Router();
  submissionRouter.route('/')
    .post((req, res) => {
      const submission = new Submission(req.body);
      submission.save();
      return res.status(201).json(submission);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.id) {
        query.userId = req.query.id;
      }
      Submission.find(query, (err, submissions) => {
        if (err) {
          return res.send(err);
        }
        return res.json(submissions);
      });
    });

  return submissionRouter;
};

module.exports = routes;
