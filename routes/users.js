import express from 'express';

import passport from 'passport';

const router = express.Router();

import * as db from '../utils/DataBaseUtils';

db.setUpConnection();

router.get('/', (req, res) => {
    db.listUsers().then(data => res.send(data));
});

router.post('/register', function (req, res) {
    db.createUser(req.body).then(data => res.send({rights: data.rights})).catch(err => {
        console.log(err);
        res.send(404);
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {

        if (err) return next(err);
        if (!user) return res.redirect('/');

        req.logIn(user, function (err) {
            if (err) return next(err);
            res.cookie('role', user.rights);
            return res.redirect('/');
        });

    })(req, res, next);
});

router.get('/logout', function (req, res) {
    res.cookie('role', 'guest');
    req.logout();
    res.redirect('/');
});

// router.delete('/:id', (req, res) => {
//     db.deleteUser(req.params.id).then(() => res.sendStatus(200));
// });

export default router;