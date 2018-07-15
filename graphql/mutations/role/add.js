import { GraphQLNonNull } from 'graphql';
import { roleType, roleInputType } from '../../types/role';

export default (acl) => {
  return {
    type: roleType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(roleInputType),
      },
    },
    async resolve(root, params) {
      await acl.allow(params.data.role, params.data.resources, params.data.permissions);
      return {
        role: params.data.role,
        resources: params.data.resources,
        permissions: params.data.permissions,
      };
    },
  };
};
