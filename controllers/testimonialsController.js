import mongoose from "mongoose";
import '../models/Testimonial';

class TestimonialsController {

    constructor() {
        this.Testimonial = mongoose.model('Testimonial');
    }

    GetTestimonials(req, res) {
        this.Testimonial.find().then(data => res.send(data));
    }

    CreateTestimonial(req, res) {
        const testimonial = new this.Testimonial({
            title: req.body.title,
            body: req.body.body,
            autor: req.body.autor,
            gender: req.body.gender,
            createdAt: new Date()
        });

        testimonial.save().then(data => res.send(data));
    }

    UpdateTestimonial(req, res) {
        this.Testimonial.findOneAndUpdate({_id: req.params.id}, req.body, {'new': true}).then(data => res.send(data));
    }

    DeleteTestimonial(req, res) {
        this.Testimonial.findById(req.params.id).remove().then(() => res.sendStatus(200));
    }
}

export default TestimonialsController;