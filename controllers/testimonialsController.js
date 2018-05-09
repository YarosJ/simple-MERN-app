import mongoose from "mongoose";
import '../models/Testimonial';
import checkAdminInRequest from "../helpers/checkAdminInRequest";

class TestimonialsController {

    constructor(props) {
        this.Testimonial = mongoose.model('Testimonial');
    }

    testimonial_list_get(req, res) {
        this.Testimonial.find().then(data => res.send(data));
    }

    testimonial_create_post(req, res) {
        if (checkAdminInRequest(req)) {

            const testimonial = new this.Testimonial({
                title: req.body.title,
                body: req.body.body,
                autor: req.body.autor,
                gender: req.body.gender,
                createdAt: new Date()
            });

            testimonial.save().then(data => res.send(data));

        } else {
            res.sendStatus(403);
        }
    }

    testimonial_update_put(req, res) {
        if (checkAdminInRequest(req)) {
            this.Testimonial.findOneAndUpdate({_id: req.params.id}, req.body, {'new': true}).then(data => res.send(data));
        } else {
            res.sendStatus(403);
        }
    }

    testimonial_delete_post(req, res) {
        if (checkAdminInRequest(req)) {
            this.Testimonial.findById(req.params.id).remove().then(() => res.sendStatus(200));
        } else {
            res.sendStatus(403);
        }
    }
}

export default TestimonialsController;