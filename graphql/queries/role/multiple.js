import mongoose from 'mongoose';
import { GraphQLList } from 'graphql';
import { roleType } from '../../types/role';

const roleModel = mongoose.model('Role');

export default (acl) => {
  return {
    type: new GraphQLList(roleType),
    async resolve() {
      const roles = await roleModel.find({}, { key: 1, _id: 0 });
      if (!roles) {
        throw new Error('Error getting roles');
      }
      return roles.map(async (rl) => {
        const role = rl._doc.key;
        return { role, resources: await acl.whatResources(role) };
      });
    },
  };
};
