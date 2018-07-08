import mongoose from 'mongoose';
import '../models/Testimonial';
import handleError from '../helpers/HandleError';

class TestimonialsController {
  constructor() {
    this.Testimonial = mongoose.model('Testimonial');
  }

  /**
   * Get all testimonials from DB
   * @param req
   * @param res
   */

  getTestimonials(req, res) {
    this.Testimonial.find({}, { title: 1, createdAt: 1, body: 1, autor: 1, gender: 1 })
      .then(data => res.status(200).json(data))
      .catch(err => handleError(err, res, 'testimonial'));
  }

  /**
   * Create testimonial by data in request
   * @param req
   * @param res
   */

  createTestimonial(req, res) {
    const testimonial = new this.Testimonial({
      title: req.body.title,
      body: req.body.body,
      autor: req.body.autor,
      gender: req.body.gender,
      createdAt: new Date(),
    });

    testimonial.save().then(data => res.status(201).json(data))
      .catch(err => handleError(err, res, 'testimonial'));
  }

  /**
   * Update testimonial by id from params by request body
   * @param req
   * @param res
   */

  updateTestimonial(req, res) {
    this.Testimonial.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((data) => {
        data
          ? res.status(200).json(data)
          : res.status(404).json({ message: "Testimonial by this id doesn't exist" });
      })
      .catch(err => handleError(err, res, 'testimonial'));
  }

  /**
   * Delete testimonial by id from params
   * @param req
   * @param res
   */

  deleteTestimonial(req, res) {
    this.Testimonial.findById(req.params.id).remove()
      .then(data => {
        if (data.result.n === 1 && data.result.ok === 1) {
          res.status(200).json({ message: 'Success' });
        } else if (data.result.n === 0) {
          res.status(404).json({ message: "Testimonial by this id doesn't exist" });
        } else res.status(500).json({ message: 'Server error' });
      }).catch(err => handleError(err, res, 'testimonial'));
  }
}

export default TestimonialsController;
