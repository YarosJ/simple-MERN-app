import GraphQLJSON from 'graphql-type-json';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql';

export const roleType = new GraphQLObjectType({
  name: 'Role',
  fields: () => ({
    role: {
      type: GraphQLString,
    },
    resources: {
      type: GraphQLJSON,
    },
  }),
});

export const roleInputType = new GraphQLInputObjectType({
  name: 'RoleInput',
  fields: () => ({
    role: {
      type: new GraphQLNonNull(GraphQLString),
    },
    resources: {
      type: new GraphQLList(GraphQLString),
    },
    permissions: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});
