import { GraphQLNonNull, GraphQLString } from 'graphql';
import { roleType } from '../../types/role';

export default (acl) => {
  return {
    type: roleType,
    args: {
      role: {
        name: 'ROLE',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    async resolve(root, params) {
      const resources = await acl.whatResources(params.role);
      return { role: params.role, resources };
    },
  };
};
