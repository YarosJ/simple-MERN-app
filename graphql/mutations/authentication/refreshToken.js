import { GraphQLNonNull, GraphQLString } from 'graphql';
import jwt from 'jsonwebtoken';
import { authenticationType } from '../../types/authentication';

export default {
  type: authenticationType,
  args: {
    refreshToken: {
      name: 'REFRESH_TOKEN',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(root, params) {
    const userId = jwt.verify(params.refreshToken, 'abvkhvbajhvabdfbvah')._id;
    return { accessToken: jwt.sign({ _id: userId }, 'abvkhvbajhvabdfbvah', { expiresIn: 60 * 15 }) };
  },
};
