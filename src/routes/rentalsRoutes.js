import { Router } from 'express';
import validateRental from '../middlewares/rentalsMiddleware.js';
import { registerRental } from '../controllers/rentalsController.js';

const router = Router();

router.post('/rentals', validateRental, registerRental);

export default router;
