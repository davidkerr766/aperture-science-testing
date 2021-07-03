const express = require('express');

const routes = (Subject) => {
  const subjectRouter = express.Router();
  subjectRouter.route('/')
    .post((req, res) => {
      const subject = new Subject(req.body);
      subject.save();
      return res.status(201).json(subject);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.TestChamber) {
        query.TestChamber = req.query.TestChamber;
      }
      Subject.find(query, (err, subjects) => {
        if (err) {
          return res.send(err);
        }
        return res.json(subjects);
      });
    });

  return subjectRouter;
};

module.exports = routes;
