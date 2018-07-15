import mongoose from 'mongoose';
import { GraphQLNonNull } from 'graphql';
import jwt from 'jsonwebtoken';
import { authenticationType, authenticationInputType } from '../../types/authentication';

const UserModel = mongoose.model('User1');

export default {
  type: authenticationType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(authenticationInputType),
    },
  },
  async resolve(root, params) {
    const user = await UserModel.findOne({ email: params.data.email });
    if (!user) {
      throw new Error('Incorrect email');
    } else if (!user.validPassword(params.data.password)) {
      throw new Error('Incorrect password');
    } else {
      const userId = user._id.toString();
      const refreshToken = jwt.sign({ _id: userId }, 'abvkhvbajhvabdfbvah', { expiresIn: 420000 });
      const data = await UserModel.findOneAndUpdate({ _id: userId },
        { refreshToken }, { new: true });
      return {
        accessToken: jwt.sign({ _id: data._id.toString() }, 'abvkhvbajhvabdfbvah', { expiresIn: 900 }),
        refreshToken,
      };
    }
  },
};
