import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const TestimonialSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  autor: { type: String },
  gender: {
    type: String,
    default: 'male',
  },
  createdAt: { type: Date },
});

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
