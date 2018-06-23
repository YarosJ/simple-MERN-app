import express from 'express';
import passport from 'passport';
import usersController from "../controllers/usersController";
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

let rt = (acl) => {

    const router = express.Router();
    const controller = new usersController();

    router.get('/', authenticationMiddleware(acl), (req, res) => controller.GetUsers(req, res, acl));

    router.post('/register', (req, res) => controller.CreateUser(req, res, acl));

    router.put('/:id', authenticationMiddleware(acl), (req, res) => controller.UpdateUser(req, res, acl));

    router.delete('/:id', authenticationMiddleware(acl), (req, res) => controller.DeleteUser(req, res));

    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {

            if (err) return next(err);
            if (!user) return res.send(info);

            req.logIn(user, function (err) {

                if (err) return next(err);

                acl.userRoles(user._id.toString(), (err, roles) => {
                    return res.send({email: user.email, role: roles[0]});
                });
            });

        })(req, res, next);
    });

    router.get('/logout', function (req, res) {
        if (req.isAuthenticated()) {
            req.logout();
            res.redirect('/');
        } else {
            res.sendStatus(200);
        }
    });

    return router;
};

export default rt;