import { Router } from 'express';
import {
  getCustomers,
  registerCustomer,
  updateCustomers
} from '../controllers/customersController.js';
import ValidateNewCustomer from '../middlewares/registerCustomersMiddleware.js';

const router = Router();

router.post('/customers', ValidateNewCustomer, registerCustomer);

router.get('/customers/:idCustomer', getCustomers);

router.get('/customers', getCustomers);

router.put('/customers/:idCustomer', ValidateNewCustomer, updateCustomers);

export default router;
