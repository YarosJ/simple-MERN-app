import express from 'express';
import passport from 'passport';
import * as db from '../helpers/DataBaseUtils';
import usersController from "../controllers/usersController";

const router = express.Router();
const controller = new usersController();

db.setUpConnection();

router.get('/', (req, res) => controller.user_list_get(req, res));

router.post('/register', (req, res) => controller.user_create_post(req, res));

router.put('/:id', (req, res) => controller.user_update_put(req, res));

router.delete('/:id', (req, res) => controller.user_delete_post(req, res));

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