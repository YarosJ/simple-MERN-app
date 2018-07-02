import express from 'express';

import UsersController from '../controllers/usersController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

const _router = (acl) => {
  const router = express.Router();
  const controller = new UsersController();

  router.get('/', authenticationMiddleware(acl), (req, res) => controller.getUsers(req, res, acl));

  router.post('/register', (req, res) => controller.createUser(req, res, acl));

  router.put('/:id', authenticationMiddleware(acl), (req, res) => controller.updateUser(req, res, acl));

  router.delete('/:id', authenticationMiddleware(acl), (req, res) => controller.deleteUser(req, res, acl));

  return router;
};

export default _router;
