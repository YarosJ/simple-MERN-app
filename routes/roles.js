import express from 'express';
import rolesController from '../controllers/rolesController';

let rt = (Acl) => {
    const router = express.Router();
    const roles = new rolesController(Acl);

    router.get('/', (req, res) => roles.GetRoles(req, res));

    router.get('/:role/rolePermissions', (req, res) => roles.GetRolePermissions(req, res));

    router.get('/:id/roles', (req, res) => roles.GetUserRoles(req, res));

    router.post('/', (req, res) => roles.AddPermissions(req, res));

    router.get('/:id/permissions', (req, res) => roles.GetUserPermissions(req, res));

    router.delete('/delete/role', (req, res) => roles.RemoveRole(req, res));

    router.post('/delete/permission', (req, res) => roles.RemovePermissions(req, res));

    return router;
}

export default rt;