import mongoose from 'mongoose';
import '../models/Testimonial';
import deasyncPromise from 'deasync-promise';

const debugControllers = require('debug')('controllers');

class UsersController {
  constructor() {
    this.User = mongoose.model('User1');
  }

  /**
   * Get all users from DB and roles for
   * users from access control list
   * @param req
   * @param res
   * @param acl (Access control list)
   */

  getUsers(req, res, acl) {
    this.User.find().then((data) => {
      try {
        const result = data.map(user => ({
          role: deasyncPromise(acl.userRoles(user._id.toString()))[0],
          ...user._doc,
        }));
        res.status(200).json(result);
      } catch (err) {
        debugControllers(err);
        res.status(500).json(err);
      }
    });
  }

  /**
   * Create user by data from request
   * and add default role for user
   * @param req
   * @param res
   * @param acl (Access control list)
   */

  createUser(req, res, acl) {
    this.User.count().exec((err, count) => {
      const user = new this.User({
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date(),
      });

      user.save().then((data) => {
        data.role = 'user';
        acl.addUserRoles(data._id.toString(), count === 0 ? 'superAdmin' : data.role, (err) => {
          if (err) {
            debugControllers(err);
            res.status(500).json(err);
          }
          res.status(201).json({ email: data.email, role: data.role });
        });
      }).catch((err) => {
        debugControllers(err);
        res.status(409).json({ message: 'This user is already registered' });
      });
    });
  }

  /**
   * Update user from request (except role)
   * or update user role if role exist in req.body
   * @param req
   * @param res
   * @param acl (Access control list)
   * @returns {Promise<void>}
   */

  async updateUser(req, res, acl) {
    const userId = req.params.id;
    if (req.body.role) {
      try {
        const roles = await acl.userRoles(userId);
        await acl.removeUserRoles(userId, roles);
        await acl.addUserRoles(req.params.id, req.body.role);

        res.status(200).json({
          role: req.body.role,
          _id: userId,
          email: req.body.email,
          createdAt: req.body.createdAt,
        });
      } catch (err) {
        if (err.code === 9) {
          res.sendStatus(404);
        } else {
          debugControllers(err);
          res.status(500).json(err);
        }
      }
    } else {
      this.User.findOneAndUpdate({ _id: userId }, req.body, { new: true })
        .then((data) => {
          data ? res.status(200).json(data) : res.sendStatus(404);
        }).catch(err => res.status(500).json(err));
    }
  }

  /**
   * Delete user by id if user not superAdmin
   * @param req
   * @param res
   * @param acl (Access control list)
   * @returns {Promise<void>}
   */

  async deleteUser(req, res, acl) {
    const userId = req.params.id;
    try {
      const roles = await acl.userRoles(userId);
      if (roles.indexOf('superAdmin') === -1) {
        if (roles.length > 0) await acl.removeUserRoles(userId, roles);
        this.User.findById(userId).then(
          user => user ? user.remove().then(() => res.sendStatus(200)) : res.sendStatus(404));
      } else res.status(403).json({ message: "SuperAdmin can't be deleted" });
    } catch (err) {
      debugControllers(err);
      res.status(500).json(err);
    }
  }
}

export default UsersController;
