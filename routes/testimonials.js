import express from 'express';
import testimonialsController from '../controllers/testimonialsController';
import * as db from '../helpers/DataBaseUtils';

const router = express.Router();
const controller = new testimonialsController();

db.setUpConnection();

router.get('/', (req, res) => controller.testimonial_list_get(req, res));

router.post('/', (req, res) => controller.testimonial_create_post(req, res));

router.put('/:id', (req, res) => controller.testimonial_update_put(req, res));

router.delete('/:id', (req, res) => controller.testimonial_delete_post(req, res));

export default router;
