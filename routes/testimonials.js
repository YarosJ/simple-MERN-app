import express from 'express';
import testimonialsController from '../controllers/testimonialsController';

const router = express.Router();
const controller = new testimonialsController();

router.get('/', (req, res) => controller.GetTestimonials(req, res));

router.post('/', (req, res) => controller.CreateTestimonial(req, res));

router.put('/:id', (req, res) => controller.UpdateTestimonial(req, res));

router.delete('/:id', (req, res) => controller.DeleteTestimonial(req, res));

export default router;
