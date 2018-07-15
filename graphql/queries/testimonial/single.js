import mongoose from "mongoose";
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { testimonialType } from '../../types/testimonial';

const testimonialModel = mongoose.model('Testimonial');

export default {
  type: testimonialType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params) {
    return testimonialModel.findById(params.id).exec();
  },
};
