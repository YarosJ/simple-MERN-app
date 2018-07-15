import mongoose from 'mongoose';
import { GraphQLList } from 'graphql';
import { userType } from '../../types/user';
import deasyncPromise from 'deasync-promise';

const userModel = mongoose.model('User1');

export default (acl) => {
  return {
    type: new GraphQLList(userType),
    resolve() {
      const data = userModel.find({}, { role: 1, createdAt: 1, email: 1 }).exec();
      try {
        return data.map(user => ({
          role: deasyncPromise(acl.userRoles(user._id.toString()))[0],
          ...user._doc,
        }));
      } catch (err) {
        throw new Error('Error getting users');
      }
    },
  };
};
