import express from 'express';
import AuthenticationController from '../controllers/authenticationController';

/**
 * Authentication route
 * @param acl (Access control list for login action)
 * @returns {Router|router|*}
 * @private
 */

const _router = (acl) => {
  const router = express.Router();
  const controller = new AuthenticationController();

  router.post('/login', (req, res, next) => controller.logIn(req, res, next, acl));

  router.post('/refresh', (req, res) => controller.refresh(req, res));

  router.get('/logout', (req, res) => controller.logOut(req, res));

  return router;
};

export default _router;
