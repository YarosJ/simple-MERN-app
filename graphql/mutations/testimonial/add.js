import mongoose from 'mongoose';
import { GraphQLNonNull } from 'graphql';
import { testimonialType, testimonialInputType } from '../../types/testimonial';

const TestimonialModel = mongoose.model('Testimonial');

export default {
  type: testimonialType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(testimonialInputType),
    },
  },
  resolve(root, params) {
    const testimonial = new TestimonialModel(params.data);

    const newTestimonial = testimonial.save().then(data => data);
    if (!newTestimonial) {
      throw new Error('Error adding testimonial');
    }
    return newTestimonial;
  },
};
