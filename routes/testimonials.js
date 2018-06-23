import express from 'express';
import testimonialsController from '../controllers/testimonialsController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

let rt = (acl) => {

    const router = express.Router();
    const controller = new testimonialsController();

    router.get('/', authenticationMiddleware(acl), (req, res) => controller.GetTestimonials(req, res));

    router.post('/', authenticationMiddleware(acl), (req, res) => controller.CreateTestimonial(req, res));

    router.put('/:id', authenticationMiddleware(acl), (req, res) => controller.UpdateTestimonial(req, res));

    router.delete('/:id', authenticationMiddleware(acl), (req, res) => controller.DeleteTestimonial(req, res));

    return router;
};

export default rt;
