import mongoose from 'mongoose';
import '../models/Role';
import handleError from '../helpers/HandleError';

class RolesController {
  constructor(Acl) {
    this.myAcl = Acl;
    this.Role = mongoose.model('Role');
  }

  /**
   * Return all roles from DB
   * @param req
   * @param res
   */

  getRoles(req, res) {
    this.Role.find({}, { key: 1, _id: 0 })
      .then(data => res.status(200).json(data))
      .catch(err => handleError(err, res, 'role'));
  }

  /**
   * Return permissions for role from request
   * @param req
   * @param res
   */

  getRolePermissions(req, res) {
    this.myAcl.whatResources(req.params.role, (err, resources) => {
      if (err) {
        return handleError(err, res, 'role');
      } else res.status(200).json(resources);
    });
  }

  /**
   * Add resource and permission from request
   * @param req
   * @param res
   */

  addAllow(req, res) {
    this.myAcl.allow(req.body.role, req.body.resource, req.body.permission, (err) => {
      if (err) {
        return handleError(err, res, 'role');
      } else res.status(200).json(req.body);
    });
  }

  /**
   * Delete allows of role from request
   * @param req
   * @param res
   */

  deleteAllow(req, res) {
    this.myAcl.removeAllow(req.params.role, req.params.resource, req.params.permission, (err) => {
      if (err) {
        return handleError(err, res, 'allow');
      } else {
        res.status(200).json({ message: 'Success' });
      }
    });
  }
}

export default RolesController;
