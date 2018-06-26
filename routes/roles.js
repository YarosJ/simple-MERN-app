import express from 'express';
import rolesController from '../controllers/rolesController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

let _router = (acl) => {

    const router = express.Router();
    const roles = new rolesController(acl);

    router.get('/', authenticationMiddleware(acl), (req, res) =>
        roles.GetRoles(req, res));

    router.get('/:role/rolePermissions', authenticationMiddleware(acl), (req, res) =>
        roles.GetRolePermissions(req, res));

    router.post('/', authenticationMiddleware(acl), (req, res) =>
        roles.AddAllow(req, res));

    router.delete('/:role/resources/:resource/permissions/:permission', authenticationMiddleware(acl), (req, res) =>
        roles.DeleteAllow(req, res));

    router.delete('/:role/resources/:resource', authenticationMiddleware(acl), (req, res) =>
        roles.DeleteAllow(req, res));

    return router;
};

export default _router;