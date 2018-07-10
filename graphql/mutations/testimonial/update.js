import mongoose from 'mongoose';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { testimonialType, testimonialInputType } from '../../types/testimonial';

const testimonialModel = mongoose.model('Testimonial');

export default {
  type: testimonialType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(testimonialInputType),
    },
  },
  resolve(root, params) {
    return testimonialModel.findByIdAndUpdate(params.id, {
      $set: { ...params.data },
    }, { new: true })
      .catch(err => new Error('Couldn\'t Update Testimonial data, ', err));
  },
};
