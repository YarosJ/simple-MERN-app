import mongoose from 'mongoose';
import '../models/User';
import passport from 'passport/lib/index';
import jwt from 'jsonwebtoken';

const debugControllers = require('debug')('controllers');

class AuthenticationController {
  constructor() {
    this.User = mongoose.model('User1');
  }

  async logIn(req, res, next, acl) {
    if (req.get('Authorization')) {
      try {
        const user = await this.User.findOne({ email: req.body.email });
        if (!user) {
          res.send({ message: 'Incorrect email.' });
        } else if (!user.validPassword(req.body.password)) {
          res.send({ message: 'Incorrect password.' });
        } else {
          const userId = user._id.toString();
          const refreshToken = jwt.sign({ _id: userId }, 'secret', { expiresIn: 1440 * 6 });
          const data = await this.User.findOneAndUpdate({ _id: userId },
            { refreshToken }, { new: true });
          res.send({
            acessToken: jwt.sign({ _id: data._id.toString() }, 'secret', { expiresIn: 60 * 15 }),
            refreshToken,
          });
        }
      } catch (err) {
        debugControllers(err);
        res.send(err);
      }
    } else {
      passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.send(info);
        req.logIn(user, (err) => {
          if (err) return next(err);
          acl.userRoles(user._id.toString(), (err, roles) => {
            if (err) return next(err);
            res.send({
              email: user.email,
              role: roles[0],
            });
          });
        });
      })(req, res, next);
    }
  }

  refresh(req, res) {
    try {
      const userId = jwt.verify(req.get('Authorization'), 'secret')._id;
      res.send(jwt.sign({ _id: userId }, 'secret', { expiresIn: 60 * 15 }));
    } catch (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        res.send(err.message);
      } else {
        debugControllers(err);
        res.sendStatus(500);
      }
    }
  }

  logOut(req, res) {
    if (req.isAuthenticated()) {
      req.logout();
      res.redirect('/');
    } else {
      res.sendStatus(200);
    }
  }
}

export default AuthenticationController;
