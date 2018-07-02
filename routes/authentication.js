import express from 'express';
import AuthenticationController from '../controllers/authenticationController';

const _router = (acl) => {
  const router = express.Router();
  const controller = new AuthenticationController();

  router.post('/login', (req, res, next) => controller.logIn(req, res, next, acl));

  router.post('/refresh', (req, res) => controller.refresh(req, res));

  router.get('/logout', (req, res) => controller.logOut(req, res));

  return router;
};

export default _router;
