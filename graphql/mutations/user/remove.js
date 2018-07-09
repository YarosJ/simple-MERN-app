import { GraphQLNonNull, GraphQLID } from 'graphql';

import { userType } from '../../types/user';
import UserModel from '../../../models/User';

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params) {
    const removeduser = UserModel.findByIdAndRemove(params.id).exec();
    if (!removeduser) {
      throw new Error('Error removing user');
    }
    return removeduser;
  },
};
