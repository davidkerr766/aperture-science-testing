const express = require('express');

const routes = (Subject) => {
  const loginRouter = express.Router();
  loginRouter.post('/', async (req, res) => {
    const response = {};
    if (req.body.Username === 'GLaDOS' && req.body.Password === 'ISawDeer') {
      response.role = 'admin';
      return res.json(response);
    }
    const subject = await Subject.find({ Username: req.body.Username, Password: req.body.Password }).exec();
    return res.json(subject);
  });
  return loginRouter;
};

module.exports = routes;
