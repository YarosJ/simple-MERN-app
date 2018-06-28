import express from 'express';
import passport from 'passport';
import UsersController from '../controllers/usersController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

const _router = (acl) => {
  const router = express.Router();
  const controller = new UsersController();

  router.get('/', authenticationMiddleware(acl), (req, res) => controller.getUsers(req, res, acl));

  router.post('/register', (req, res) => controller.createUser(req, res, acl));

  router.put('/:id', authenticationMiddleware(acl), (req, res) => controller.updateUser(req, res, acl));

  router.delete('/:id', authenticationMiddleware(acl), (req, res) => controller.deleteUser(req, res, acl));

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.send(info);

      req.logIn(user, (err) => {
        if (err) return next(err);
        acl.userRoles(user._id.toString(), (err, roles) => res.send({
          email: user.email,
          role: roles[0],
        }));
      });
    })(req, res, next);
  });

  router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
      req.logout();
      res.redirect('/');
    } else {
      res.sendStatus(200);
    }
  });

  return router;
};

export default _router;
