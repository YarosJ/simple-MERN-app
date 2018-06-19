import mongoose from "mongoose";
import '../models/Testimonial';
import deasyncPromise from 'deasync-promise';

class UsersController {

    constructor() {
        this.User = mongoose.model('User');
    }

    GetUsers(req, res, acl) {

        // this.User.find({})
        //     .populate('roles')
        //     .exec(function(error, posts) {
        //         console.log(JSON.stringify(posts, null, "\t"))
        //     });

        this.User.find().then(data => {
            try {
                let result = data.map((user) => {
                    // console.log(user);
                    // acl.whatResources(deasyncPromise(acl.userRoles(user._id.toString()))[0], (err, resourceName) => console.log(resourceName, '*********'));

                    return {role: deasyncPromise(acl.userRoles(user._id.toString()))[0], ...user._doc};
                });
                res.send(result);
            }
            catch (e) {
                console.error(e);
            }
        });
    }

    CreateUser(req, res, acl) {

        // this.User.count({"rights": 'superAdmin'}).exec((err, count) => {

        const user = new this.User({
            email: req.body.email,
            password: req.body.password,
            // roles: '5affc5baf9ce900830f14295',
            // rights: count === 0 ? "superAdmin" : req.body.rights,
            createdAt: new Date()
        });

        user.save().then(data => {
            data.role = 'user';
            acl.addUserRoles(data._id.toString(), data.role, (err) => {
                if (err) console.log(err);
                res.send({email: data.email, role: data.role});
            });
        }).catch(err => {
            res.send(500);
        });
        // });
    }

    UpdateUser(req, res, acl) {
        let userId = req.params.id;

        if (req.body.role) {
            acl.userRoles(userId, (err, roles) =>
                acl.removeUserRoles(userId, roles, (err) =>
                    acl.addUserRoles(req.params.id, req.body.role, (err) => {
                        if (!err) {
                            res.sendStatus(200);
                        } else console.log(err, req.params.id, req.body.role);
                    })
                )
            );

        } else this.User.findOneAndUpdate({_id: userId}, req.body, {'new': true}).then(data => res.send(data));

        // this.User.count({"rights": 'superAdmin'}).exec((err, count) => {
        //     if (count !== 1) {
        //         currentUser.remove().then(() => res.sendStatus(200));
        //     } else {
        //         this.User.findOne({"rights": 'superAdmin'}).exec((error, user) => {
        //             if (user._id != req.params.id) {
        //                 currentUser.remove().then(() => res.sendStatus(200));
        //             } else res.sendStatus(403);
        //         });
        //     }
        // });

    }

    DeleteUser(req, res) {
        this.User.findById(req.params.id).then(user => {

            /**
             *
             * ##############
             * ##############
             * ##############
             *
             */

            if (' ACL.USER_ROLES!!! user.rights' !== 'superAdmin') {
                //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

                user.remove().then(() => res.sendStatus(200));
            } else res.sendStatus(403);
        });
    }
}

export default UsersController;