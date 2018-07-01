import express from 'express';
import TestimonialsController from '../controllers/testimonialsController';
import authenticationMiddleware from '../helpers/authentication/AuthenticationMiddleware';

const _router = (acl) => {
  const router = express.Router();
  const controller = new TestimonialsController();

  router.get('/', authenticationMiddleware(acl), (req, res) => controller.getTestimonials(req, res));

  router.post('/', authenticationMiddleware(acl), (req, res) => controller.createTestimonial(req, res));

  router.put('/:id', authenticationMiddleware(acl), (req, res) => controller.updateTestimonial(req, res));

  router.delete('/:id', authenticationMiddleware(acl), (req, res) => controller.deleteTestimonial(req, res));

  return router;
};

export default _router;
