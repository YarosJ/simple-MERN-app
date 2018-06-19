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

    GetUserRoles(req, res) {
        this.myAcl.userRoles(req.session.passport.user._id, (err, roles) => console.log(roles));
    }

    GetUserPermissions(req, res) {
        this.myAcl.allowedPermissions(req.session.passport.user._id, '*', (err, obj) => console.log(obj));
    }

    AddPermissions(req, res) {
        this.myAcl.allow(req.body.roles, req.body.resources, req.body.permissions, (err) => err ? res.sendStatus(500) : res.send(req.body));
    }

    RemoveRole(req, res) {
        this.myAcl.removeRole(req.body.role, (err) => console.log(null));
    }

    RemovePermissions(req, res) {
        this.myAcl.removeAllow(req.body.roles, req.body.resources, req.body.permissions, (err) => err ? res.sendStatus(500) : res.send(req.body));
    }

}

export default RolesController;