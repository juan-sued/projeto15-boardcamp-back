import { Router } from 'express';
import { registerGame } from '../controllers/gamesController.js';
import validateNewGame from '../middlewares/registerGameMiddleware.js';

const router = Router();

router.post('/games', validateNewGame, registerGame);

router.get('/games');
export default router;
