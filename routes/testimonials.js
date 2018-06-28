import express from 'express';
import TestimonialsController from '../controllers/testimonialsController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

const _router = (acl) => {
  const router = express.Router();
  const controller = new TestimonialsController();

  router.get('/', authenticationMiddleware(acl), (req, res) => controller.GetTestimonials(req, res));

  router.post('/', authenticationMiddleware(acl), (req, res) => controller.CreateTestimonial(req, res));

  router.put('/:id', authenticationMiddleware(acl), (req, res) => controller.UpdateTestimonial(req, res));

  router.delete('/:id', authenticationMiddleware(acl), (req, res) => controller.DeleteTestimonial(req, res));

  return router;
};

export default _router;
