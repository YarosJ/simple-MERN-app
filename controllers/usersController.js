import mongoose from 'mongoose';
import '../models/Testimonial';
import deasyncPromise from 'deasync-promise';

const debugControllers = require('debug')('controllers');

class UsersController {
  constructor() {
    this.User = mongoose.model('User1');
  }

  getUsers(req, res, acl) {
    this.User.find().then((data) => {
      try {
        const result = data.map(user => ({
          role: deasyncPromise(acl.userRoles(user._id.toString()))[0],
          ...user._doc,
        }));
        res.send(result);
      } catch (err) {
        debugControllers(err);
        res.send({ message: 'Server error' });
      }
    });
  }

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
            res.send({ message: 'Server error' });
          }
          res.send({ email: data.email, role: data.role });
        });
      }).catch((err) => {
        debugControllers(err);
        res.send({ message: 'This user is already registered' });
      });
    });
  }

  async updateUser(req, res, acl) {
    const userId = req.params.id;
    if (req.body.role) {
      try {
        const roles = await acl.userRoles(userId);
        await acl.removeUserRoles(userId, roles);
        await acl.addUserRoles(req.params.id, req.body.role);

        res.send({
          role: req.body.role,
          _id: userId,
          email: req.body.email,
          createdAt: req.body.createdAt,
        });
      } catch (err) {
        debugControllers(err);
        res.send({ message: 'Server error' });
      }
    } else {
      this.User.findOneAndUpdate({ _id: userId }, req.body, { new: true })
        .then(data => res.send(data));
    }
  }

  async deleteUser(req, res, acl) {
    const userId = req.params.id;
    try {
      const roles = await acl.userRoles(userId);
      if (roles.indexOf('superAdmin') === -1) {
        if (roles.length > 0) await acl.removeUserRoles(userId, roles);
        this.User.findById(userId).then(user => user.remove().then(() => res.sendStatus(200)));
      } else res.send({ message: "SuperAdmin can't be deleted" });
    } catch (err) {
      debugControllers(err);
      res.send({ message: 'Server error' });
    }
  }
}

export default UsersController;
