import mongoose from 'mongoose';
import '../models/Testimonial';

const debugControllers = require('debug')('controllers');

class TestimonialsController {
  constructor() {
    this.Testimonial = mongoose.model('Testimonial');
  }

  getTestimonials(req, res) {
    this.Testimonial.find().then(data => res.send(data))
      .catch(err => debugControllers(err));
  }

  createTestimonial(req, res) {
    const testimonial = new this.Testimonial({
      title: req.body.title,
      body: req.body.body,
      autor: req.body.autor,
      gender: req.body.gender,
      createdAt: new Date(),
    });

    testimonial.save().then(data => res.send(data)).catch(err => debugControllers(err));
  }

  updateTestimonial(req, res) {
    this.Testimonial.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => res.send(data)).catch(err => debugControllers(err));
  }

  deleteTestimonial(req, res) {
    this.Testimonial.findById(req.params.id).remove()
      .then(() => res.sendStatus(200)).catch(err => debugControllers(err));
  }
}

export default TestimonialsController;
