import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';

export const testimonialType = new GraphQLObjectType({
  name: 'Testimonial',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    autor: {
      type: GraphQLString,
    },
  }),
});

export const testimonialInputType = new GraphQLInputObjectType({
  name: 'TestimonialInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    autor: {
      type: GraphQLString,
    },
  }),
});
