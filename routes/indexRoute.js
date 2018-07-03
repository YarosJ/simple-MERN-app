import path from 'path';
import authentication from './authentication';
import users from './users';
import roles from './roles';
import testimonials from './testimonials';

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

  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '//../view/index.html')));
};
