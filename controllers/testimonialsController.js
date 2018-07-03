import mongoose from 'mongoose';
import '../models/Testimonial';

const debugControllers = require('debug')('controllers');

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
    this.Testimonial.find().then(data => res.status(200).json(data))
	  .catch((err) => {
		debugControllers(err);
		res.status(500).json(err);
	  });
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
      .catch((err) => {
        debugControllers(err);
        res.status(500).json(err);
      });
  }

  /**
   * Update testimonial by id from params by request body
   * @param req
   * @param res
   */

  updateTestimonial(req, res) {
    this.Testimonial.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((data) => {
        data ? res.status(200).json(data) : res.sendStatus(404);
      })
      .catch((err) => {
        debugControllers(err);
        res.status(500).json(err);
      });
  }

  /**
   * Delete testimonial by id from params
   * @param req
   * @param res
   */

  deleteTestimonial(req, res) {
    this.Testimonial.findById(req.params.id).remove()
	  .then(data => res.status(200).json(data))
	  .catch((err) => {
	  	debugControllers(err);
	  	res.status(500).json(err);
	  });
  }
}

export default TestimonialsController;
