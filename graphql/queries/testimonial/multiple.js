import mongoose from "mongoose";
import { GraphQLList } from 'graphql';
import { testimonialType } from '../../types/testimonial';
import '../../../models/Testimonial';

const testimonialModel = mongoose.model('Testimonial');

export default {
  type: new GraphQLList(testimonialType),
  resolve() {
    const testimonials = testimonialModel.find({}).exec();
    if (!testimonials) {
      throw new Error('Error getting testimonials');
    }
    return testimonials;
  },
};
