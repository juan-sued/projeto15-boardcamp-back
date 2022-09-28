import { Router } from 'express';
import { registerCategory } from '../controllers/categoriesControllers.js';
import validateNewCategory from '../middlewares/registerCategoriesMiddleware.js';

const router = Router();

router.post('/categories', validateNewCategory, registerCategory);

export default router;
