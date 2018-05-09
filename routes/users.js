import express from 'express';

import passport from 'passport';

const router = express.Router();

import * as db from '../utils/DataBaseUtils';

import checkAdminInRequest from '../helpers/checkAdminInRequest';

db.setUpConnection();

router.get('/', (req, res) => {
    db.listUsers().then(data => res.send(data));
});

router.post('/register', function (req, res) {
    db.createUser(req.body).then(data => res.send(data)).catch(err => {
        res.send(500);
    });
});

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
    if(req.isAuthenticated()){
        req.logout();
        res.redirect('/');
    } else {
        res.sendStatus(200);
    }
});

router.put('/:id', (req, res) => {
    if (checkAdminInRequest(req)) {
        db.updateUser(req.body, req.params.id).then(data => res.send(data));
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    if(checkAdminInRequest(req)) {
        db.deleteUser(req.params.id).then(() => res.sendStatus(200));
    } else {
        res.sendStatus(403);
    }
});

export default router;