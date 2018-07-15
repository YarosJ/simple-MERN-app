import mongoose from "mongoose";
import { GraphQLID, GraphQLNonNull } from 'graphql';
import { userType } from '../../types/user';

const userModel = mongoose.model('User1');

export default (acl) => {
  return {
    type: userType,
    args: {
      id: {
        name: 'ID',
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    async resolve(root, params) {
      const roles = await acl.userRoles(params.id);
      const user = await userModel.findById(params.id);
      return { email: user.email, role: roles[0], _id: params.id, createdAt: user.createdAt };
    },
  }
}
