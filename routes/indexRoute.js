import path from 'path';
import graphqlHTTP from 'express-graphql';
import authentication from './authentication';
import users from './users';
import roles from './roles';
import testimonials from './testimonials';
import gSchema from '../graphql';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

/**
 * Main route
 * @param app (Application object)
 * @param acl (Access control list)
 */

export default (app, acl) => {
  app.use('/', authentication(acl));
  app.use('/testimonials', testimonials(acl));
  app.use('/users', users(acl));
  app.use('/roles', roles(acl));

  /**
   * GraphQL api route
   */

  const schema = gSchema(acl);

  app.all('/graphql', authenticationMiddleware(acl), graphqlHTTP(() => ({
    schema,
    graphiql: true,
    pretty: true,
  })));

  /**
   * Sending 404 or index.html (for the react)
   * depending on the type of requested content for not existing route
   */

  app.use((req, res) => {
    const contentType = req.headers['content-type'];
    if (contentType && contentType.indexOf('application/json') > -1) {
      res.status(404).json({ message: 'Resource not found' });
    } else res.sendFile(path.join(__dirname, '//../view/index.html'));
  });
};
