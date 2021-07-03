const express = require('express');

const routes = (Subject) => {
  const subjectRouter = express.Router();
  subjectRouter.route('/subjects')
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

  subjectRouter.route('/subjects/:id')
    .get((req, res) => {
      Subject.findById(req.params.id, (err, subject) => {
        if (err) {
          return res.send(err);
        }
        return res.json(subject);
      });
    });
  return subjectRouter;
};

module.exports = routes;
