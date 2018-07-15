import mongoose from 'mongoose';
import { GraphQLNonNull } from 'graphql';
import { userType, userInputType } from '../../types/user';

const UserModel = mongoose.model('User1');

export default (acl) => {
  return {
    type: userType,
    args: {
      data: {
        name: 'data',
        type: new GraphQLNonNull(userInputType),
      },
    },
    async resolve(root, params) {
      const count = await UserModel.count();
      params.data.createdAt = new Date();
      const user = new UserModel(params.data);
      const data = await user.save();

      data.role = 'user';

      await acl.addUserRoles(data._id.toString(), count === 0 ? 'superAdmin' : data.role);

      return { email: data.email, role: data.role, _id: data._id, createdAt: data.createdAt };
    },
  };
};
