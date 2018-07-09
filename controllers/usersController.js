import mongoose from 'mongoose';
import '../models/Testimonial';
import deasyncPromise from 'deasync-promise';
import handleError from '../helpers/HandleError';

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
    this.User.find({}, { role: 1, createdAt: 1, email: 1 }).then((data) => {
      try {
        const result = data.map(user => ({
          role: deasyncPromise(acl.userRoles(user._id.toString()))[0],
          ...user._doc,
        }));
        res.status(200).json(result);
      } catch (err) {
        return handleError(err, res, 'user');
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
          if (err) return handleError(err, 'user');
          res.status(201).json({ email: data.email, role: data.role });
        });
      }).catch((err) => handleError(err, res, 'user'));
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
    const { role } = req.body;
    try {
      const data = await this.User.findOneAndUpdate({ _id: userId }, req.body, { new: true });
      if (role) {
        const roles = await acl.userRoles(userId);
        await acl.removeUserRoles(userId, roles);
        await acl.addUserRoles(req.params.id, role);
        data.role = role;
      }
      res.status(200).json({
        _id: data._id,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt,
      });
    } catch (err) {
      return handleError(err, res, 'user');
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
        const user = await this.User.findById(userId);
        user
          ? user.remove().then(() => res.status(200).json({ message: 'Success' }))
          : res.status(404).json({ message: 'This user is not found' });
      } else res.status(403).json({ message: "SuperAdmin can't be deleted" });
    } catch (err) {
      return handleError(err, res, 'user');
    }
  }
}

export default UsersController;
