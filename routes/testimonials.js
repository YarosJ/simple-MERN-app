import express from 'express';

const router = express.Router();

import * as db from '../utils/DataBaseUtils';

db.setUpConnection();

router.get('/', (req, res) => {
    db.listTestimonials().then(data => res.send(data));
});

router.post('/', (req, res) => {
    // console.log(req.session.passport.user.rights);
    if (req.isAuthenticated()) {
        db.createTestimonial(req.body).then(data => res.send(data));
    } else {
        res.sendStatus(403);
    }

});

router.put('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        db.updateTestimonial(req.body, req.params.id).then(data => res.send(data));
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        db.deleteTestimonial(req.params.id).then(() => res.sendStatus(200));
    } else {
        res.sendStatus(403);
    }
});

export default router;
