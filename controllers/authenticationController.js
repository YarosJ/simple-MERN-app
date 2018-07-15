import mongoose from 'mongoose';
import '../models/User';
import passport from 'passport/lib/index';
import jwt from 'jsonwebtoken';
import handleError from '../helpers/HandleError';

const debugControllers = require('debug')('controllers');

class AuthenticationController {
  constructor() {
    this.User = mongoose.model('User1');
  }

  /**
   * Log in user action.
   * Depending on the presence of "Authorization" header, create JWT or use session
   * @param req
   * @param res
   * @param next
   * @param acl (Access control list)
   * @returns {Promise<void>}
   */

  async logIn(req, res, next, acl) {
    if (req.get('Authorization')) {
      try {
        const user = await this.User.findOne({ email: req.body.email });
        if (!user) {
          res.status(400).json({ message: 'Incorrect email.' });
        } else if (!user.validPassword(req.body.password)) {
          res.status(400).json({ message: 'Incorrect password.' });
        } else {
          const userId = user._id.toString();
          const refreshToken = jwt.sign({ _id: userId }, 'abvkhvbajhvabdfbvah', { expiresIn: 420000 });
          const data = await this.User.findOneAndUpdate({ _id: userId },
            { refreshToken }, { new: true });
          res.status(200).json({
            acessToken: jwt.sign({ _id: data._id.toString() }, 'abvkhvbajhvabdfbvah', { expiresIn: 900 }),
            refreshToken,
          });
        }
      } catch (err) {
        return handleError(err, res, 'authorization');
      }
    } else {
      passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json(info);
        req.logIn(user, (err) => {
          if (err) return next(err);
          acl.userRoles(user._id.toString(), (err, roles) => {
            if (err) return next(err);
            res.status(200).json({
              email: user.email,
              role: roles[0],
            });
          });
        });
      })(req, res, next);
    }
  }

  /**
   * Returns new access json web token by refresh key
   * @param req
   * @param res
   */

  refresh(req, res) {
    try {
      const userId = jwt.verify(req.get('Authorization'), 'abvkhvbajhvabdfbvah')._id;
      res.status(200).json(jwt.sign({ _id: userId }, 'abvkhvbajhvabdfbvah', { expiresIn: 900 }));
    } catch (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        res.status(400).json(err);
      } else {
        debugControllers(err);
        res.status(500).json({ message: 'Server Error.' });
      }
    }
  }

  /**
   * Log out action.
   * @param req
   * @param res
   */

  logOut(req, res) {
    if (req.isAuthenticated()) {
      req.logout();
      res.redirect('/');
    } else {
      res.status(200).json({ message: 'Success log out!'});
    }
  }
}

export default AuthenticationController;
