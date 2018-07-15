import mongoose from 'mongoose';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { userType } from '../../types/user';

const UserModel = mongoose.model('User1');

export default (acl) => {
  return {
    type: userType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    async resolve(root, params) {

      const userId = params.id;

      const roles = await acl.userRoles(userId);
      if (roles.indexOf('superAdmin') === -1) {
        if (roles.length > 0) await acl.removeUserRoles(userId, roles);
        const user = await UserModel.findById(userId);
        if (user) {
          await user.remove();
          return user;
        } else throw new Error('This user is not found');
      } else {
        throw new Error("SuperAdmin can't be deleted");
      }
    },
  };
};
