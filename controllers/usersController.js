import mongoose from "mongoose";
import '../models/Testimonial';
import checkAdminInRequest from "../helpers/checkAdminInRequest";

class UsersController {

    constructor(props) {
        this.User = mongoose.model('User');
    }

    user_list_get(req, res) {
        this.User.find().then(data => res.send(data));
    }

    user_create_post(req, res) {
        // this.User.count({"rights": 'superAdmin'}, (count) => sss = count);

        const user = new this.User({
            email: req.body.email,
            password: req.body.password,
            rights: req.body.rights,
            createdAt: new Date()
        });

        user.save().then(data => res.send(data)).catch(err => {
            res.send(500);
        });
    }

    user_update_put(req, res) {
        if (checkAdminInRequest(req)) {
            this.User.findOneAndUpdate({_id: req.params.id}, req.body, {'new': true}).then(data => res.send(data));
        } else {
            res.sendStatus(403);
        }
    }

    user_delete_post(req, res) {
        if (checkAdminInRequest(req)) {
            this.User.findById(req.params.id).remove().then(() => res.sendStatus(200));
        } else {
            res.sendStatus(403);
        }
    }
}

export default UsersController;