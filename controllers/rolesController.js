import mongoose from "mongoose";
import '../models/Role';

class RolesController {

    constructor(Acl) {
        this.myAcl = Acl;
        this.Role = mongoose.model('Role');
    }

    GetRoles(req, res) {
        this.Role.find({}, {key: 1}).then(data => res.send(data));
    }

    GetRolePermissions(req, res) {
        this.myAcl.whatResources(req.params.role, (err, resources) => res.send(resources));
    }

    AddAllow(req, res) {
        this.myAcl.allow(req.body.role, req.body.resource, req.body.permission, (err) => err ? res.sendStatus(500) : res.send(req.body));
    }

    DeleteAllow(req, res) {
        this.myAcl.removeAllow(req.params.role, req.params.resource, req.params.permission, (err) => err ? res.sendStatus(500) : res.send(req.params));
    }

}

export default RolesController;