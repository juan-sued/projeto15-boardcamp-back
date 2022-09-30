import { Router } from 'express';
import { registerCustomer } from '../controllers/customersController.js';
import ValidateNewCustomer from '../middlewares/registerCustomersMiddleware.js';

const router = Router();

router.post('/customers', ValidateNewCustomer, registerCustomer);

export default router;
