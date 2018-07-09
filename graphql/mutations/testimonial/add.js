import mongoose from 'mongoose';
import { GraphQLNonNull } from 'graphql';
import { testimonialType, testimonialInputType } from '../../types/testimonial';

const testimonialModel = mongoose.model('Testimonial');

export default {
  type: testimonialType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(testimonialInputType),
    },
  },
  resolve(root, params) {
    const testimonial = new testimonialModel(params.data);

    testimonial.save().then(data => { return data; });
  },
};
