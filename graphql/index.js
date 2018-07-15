import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import mutations from './mutations';
import queries from './queries';

const schema = (acl) => {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: queries(acl),
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutations(acl),
    }),
  });
};

export default schema;
