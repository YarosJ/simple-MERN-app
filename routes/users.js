import express from 'express';
import passport from 'passport';
import usersController from "../controllers/usersController";

const router = express.Router();
const controller = new usersController();

router.get('/', (req, res) => controller.GetUsers(req, res));

router.post('/register', (req, res) => controller.CreateUser(req, res));

router.put('/:id', (req, res) => controller.UpdateUser(req, res));

router.delete('/:id', (req, res) => controller.DeleteUser(req, res));

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {

        if (err) return next(err);
        if (!user) return res.redirect('/');

        req.logIn(user, function (err) {
            if (err) return next(err);
            return res.send(user);
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

export default router;