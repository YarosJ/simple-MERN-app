import mongoose from "mongoose";
import '../models/Testimonial';
import deasyncPromise from 'deasync-promise';

const debugControllers = require('debug')('controllers');

class UsersController {

    constructor() {
        this.User = mongoose.model('User');
    }

    GetUsers(req, res, acl) {

        this.User.find().then(data => {
            try {
                let result = data.map((user) => {
                    return {role: deasyncPromise(acl.userRoles(user._id.toString()))[0], ...user._doc};
                });
                res.send(result);
            }
            catch (err) {
                debugControllers(err);
                res.send({message: "Server error"});
            }
        });
    }

    CreateUser(req, res, acl) {

        this.User.count().exec((err, count) => {

            const user = new this.User({
                email: req.body.email,
                password: req.body.password,
                createdAt: new Date()
            });

            user.save().then(data => {
                data.role = 'user';
                acl.addUserRoles(data._id.toString(), count === 0 ? "superAdmin" : data.role, (err) => {
                    if (err) {
                        debugControllers(err);
                        res.send({message: "Server error"});
                    }
                    res.send({email: data.email, role: data.role});
                });
            }).catch(err => {
                debugControllers(err);
                res.send({message: "This user is already registered"});
            });

        });
    }

    UpdateUser(req, res, acl) {
        let userId = req.params.id;

        if (req.body.role) {
            acl.userRoles(userId, (err, roles) =>
                acl.removeUserRoles(userId, roles, (err) =>
                    acl.addUserRoles(req.params.id, req.body.role, (err) => {
                        if (!err) {
                            res.send({
                                role: req.body.role,
                                _id: userId,
                                email: req.body.email,
                                createdAt: req.body.createdAt
                            });
                        } else {
                            debugControllers(err);
                            res.send({message: "Server error"});
                        }
                    })
                )
            );
        } else this.User.findOneAndUpdate({_id: userId}, req.body, {'new': true}).then(data => res.send(data));
    }

    DeleteUser(req, res, acl) {
        let userId = req.params.id;

        acl.userRoles(userId, (err, roles) => {
                if (roles.indexOf('superAdmin') === -1) {
                    if (roles.length > 0) {
                        acl.removeUserRoles(userId, roles, (err) => {
                                if (!err) {
                                    this.User.findById(userId).then(user =>
                                        user.remove().then(() => res.sendStatus(200)));
                                } else {
                                    debugControllers(err);
                                    res.send({message: "Server error"});
                                }
                            }
                        );
                    } else {
                        this.User.findById(userId).then(user =>
                            user.remove().then(() => res.sendStatus(200)));
                    }
                } else res.send({message: "SuperAdmin can't be deleted"});
            }
        );
    }
}

export default UsersController;