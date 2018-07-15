import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { roleType } from '../../types/role';

export default (acl) => {
  return {
    type: roleType,
    args: {
      role: {
        name: 'ROLE',
        type: new GraphQLNonNull(GraphQLString),
      },
      permissions: {
        name: 'PERMISSIONS',
        type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      },
      resources: {
        name: 'RESOURCES',
        type: new GraphQLList(GraphQLString),
      },
    },
    async resolve(root, params) {
      await acl.removeAllow(params.role, params.resources, params.permissions);
      return {
        role: params.role,
        resources: params.resources,
        permissions: params.permissions,
      };
    },
  };
};
