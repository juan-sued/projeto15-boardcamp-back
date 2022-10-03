import { Router } from 'express';
import validateRental from '../middlewares/rentalsMiddleware.js';
import { getRentals, registerRental } from '../controllers/rentalsController.js';

const router = Router();

router.post('/rentals', validateRental, registerRental);
router.get('/rentals', getRentals);

export default router;
