import mongoose from "mongoose";
import '../models/Testimonial';

class UsersController {

    constructor() {
        this.User = mongoose.model('User');
    }

    GetUsers(req, res) {
        this.User.find().then(data => res.send(data));
    }

    CreateUser(req, res) {
        this.User.count({"rights": 'superAdmin'}).exec((err, count) => {

            const user = new this.User({
                email: req.body.email,
                password: req.body.password,
                rights: count === 0 ? "superAdmin" : req.body.rights,
                createdAt: new Date()
            });

            user.save().then(data => res.send(data)).catch(err => {
                res.send(500);
            });
        });
    }

    UpdateUser(req, res) {
        this.User.findOneAndUpdate({_id: req.params.id}, req.body, {'new': true}).then(data => res.send(data));
    }

    DeleteUser(req, res) {
        let currentUser = this.User.findById(req.params.id);
        this.User.count({"rights": 'superAdmin'}).exec((err, count) => {
            if (count !== 1) {
                currentUser.remove().then(() => res.sendStatus(200));
            } else {
                this.User.findOne({"rights": 'superAdmin'}).exec((error, user) => {
                    if (user._id != req.params.id) {
                        currentUser.remove().then(() => res.sendStatus(200));
                    } else res.sendStatus(403);
                });
            }
        });
    }
}

export default UsersController;