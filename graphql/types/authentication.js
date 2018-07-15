import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export const authenticationType = new GraphQLObjectType({
  name: 'Authentication',
  fields: () => ({
    accessToken: {
      type: GraphQLString,
    },
    refreshToken: {
      type: GraphQLString,
    },
  }),
});

export const authenticationInputType = new GraphQLInputObjectType({
  name: 'AuthenticationInput',
  fields: () => ({
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    refreshToken: {
      type: GraphQLString,
    },
  }),
});
