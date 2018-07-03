import express from 'express';
import RolesController from '../controllers/rolesController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

/**
 * Roles route
 * @param acl (Access control list for authentication middleware)
 * @returns {Router|router|*}
 * @private
 */

const _router = (acl) => {
  const router = express.Router();
  const roles = new RolesController(acl);

  router.get('/', authenticationMiddleware(acl), (req, res) => roles.getRoles(req, res));

  router.get('/:role/permissions', authenticationMiddleware(acl), (req, res) => roles.getRolePermissions(req, res));

  router.post('/', authenticationMiddleware(acl), (req, res) => roles.addAllow(req, res));

  router.delete('/:role/resources/:resource/permissions/:permission', authenticationMiddleware(acl), (req, res) => roles.deleteAllow(req, res));

  router.delete('/:role/resources/:resource', authenticationMiddleware(acl), (req, res) => roles.deleteAllow(req, res));

  return router;
};

export default _router;
