import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} from 'graphql';

// import TestimonialModel from '../../models/Testimonial';
// import { testimonialType } from './testimonial';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    // posts: {
    //   type: new GraphQLList(testimonialType),
    //   resolve(user) {
    //     const { _id } = user;
    //     return TestimonialModel.find({ uid: _id }).exec();
    //   },
    // },
  }),
});

export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  }),
});
