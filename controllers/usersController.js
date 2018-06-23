import mongoose from "mongoose";
import '../models/Testimonial';
import deasyncPromise from 'deasync-promise';

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
            catch (e) {
                console.error(e);
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

            console.log(count);

            user.save().then(data => {
                data.role = 'user';
                acl.addUserRoles(data._id.toString(), count === 0 ? "superAdmin" : data.role, (err) => {
                    if (err) console.log(err);
                    res.send({email: data.email, role: data.role});
                });
            }).catch(err => {
                res.send(500);
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
                            res.send({role: req.body.role, _id: userId, email: req.body.email, createdAt: req.body.createdAt});
                        } else console.log(err);
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

            if ('ACL.USER_ROLES && ACL.USER_ROLES' !== 'superAdmin') {
                //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

                user.remove().then(() => res.sendStatus(200));

            } else res.sendStatus(403);
        });
    }
}

export default UsersController;