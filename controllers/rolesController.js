import mongoose from 'mongoose';
import '../models/Role';

const debugControllers = require('debug')('controllers');

class RolesController {
  constructor(Acl) {
    this.myAcl = Acl;
    this.Role = mongoose.model('Role');
  }

  GetRoles(req, res) {
    this.Role.find({}, { key: 1 }).then(data => res.send(data))
      .catch(err => debugControllers(err));
  }

  GetRolePermissions(req, res) {
    this.myAcl.whatResources(req.params.role, (err, resources) => {
      if (err) {
        debugControllers(err);
      } else res.send(resources);
    });
  }

  AddAllow(req, res) {
    this.myAcl.allow(req.body.role, req.body.resource, req.body.permission, (err) => {
      if (err) {
        debugControllers(err);
        res.sendStatus(500);
      } else res.send(req.body);
    });
  }

  DeleteAllow(req, res) {
    this.myAcl.removeAllow(req.params.role, req.params.resource, req.params.permission, (err) => {
      if (err) {
        debugControllers(err);
        res.sendStatus(500);
      } else {
        res.send(req.params);
      }
    });
  }
}

export default RolesController;
