import { GraphQLID, GraphQLNonNull } from 'graphql';
import { testimonialType } from '../../types/testimonial';
import testimonialModel from '../../../models/Testimonial';

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
