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

  app.use((req, res) => {
    const contentType = req.headers['content-type'];
    if (contentType && contentType.indexOf('application/json') > -1) {
      res.sendStatus(404);
    } else res.sendFile(path.join(__dirname, '//../view/index.html'));
  });
};
