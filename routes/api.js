import express from 'express';
import User from '../models/User';
import jwt from 'jwt-simple';

const _router = (acl) => {
  const router = express.Router();

  router.post('/getJwt', (req, res, next) => {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        debugPassport(err);
        res.send(err);
      } else if (!user) {
        res.send({ message: 'Incorrect email.' });
      } else if (!user.validPassword(req.body.password)) {
        res.send({ message: 'Incorrect password.' });
      } else {
        res.send(jwt.encode({ _id: user._id.toString() }, 'secret'));
      }
    });
  });

  router.post('/checkToken', (req, res, next) => {
    const token = req.body.token;
    if (token) {
      res.send(jwt.decode(token, 'secret'));
    }
  });

  return router;
};

export default _router;

