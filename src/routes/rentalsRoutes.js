import { Router } from 'express';
import {
  validateReturnRental,
  validateRental,
  validateDeleteRental
} from '../middlewares/rentalsMiddleware.js';
import {
  deleteRental,
  getRentals,
  registerRental,
  returnRental
} from '../controllers/rentalsController.js';

const router = Router();

router.post('/rentals', validateRental, registerRental);
router.post('/rentals/:idRental/return', validateReturnRental, returnRental);

router.get('/rentals', getRentals);

router.delete('/rentals/:idRental', validateDeleteRental, deleteRental);

export default router;
