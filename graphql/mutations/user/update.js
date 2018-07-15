import mongoose from 'mongoose';
import { GraphQLNonNull, GraphQLID } from 'graphql';
import { userType, userInputType } from '../../types/user';

const UserModel = mongoose.model('User1');

export default (acl) => {
  return {
    type: userType,
    args: {
      id: {
        name: 'ID',
        type: new GraphQLNonNull(GraphQLID),
      },
      data: {
        name: 'data',
        type: new GraphQLNonNull(userInputType),
      },
    },
    async resolve(root, params) {
      const userId = params.id;
      const data = await UserModel.findOneAndUpdate({ _id: userId }, params.data, { new: true });
      let { role } = params.data;

      if (role) {
        const roles = await acl.userRoles(userId);
        await acl.removeUserRoles(userId, roles);
        await acl.addUserRoles(userId, role);
      } else {
        role = await acl.userRoles(userId)[0];
      }

      data.role = role;

      return {
        _id: data._id,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt,
      };
    },
  };
};
