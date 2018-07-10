import mongoose from 'mongoose';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { testimonialType } from '../../types/testimonial';

const testimonialModel = mongoose.model('Testimonial');

export default {
  type: testimonialType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params) {
    const removedTestimonial = testimonialModel.findByIdAndRemove(params.id).exec();
    if (!removedTestimonial) {
      throw new Error('Error removing testimonial');
    }
    return removedTestimonial;
  },
};
