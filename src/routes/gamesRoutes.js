import { Router } from 'express';
import { getGames, registerGame } from '../controllers/gamesController.js';
import validateNewGame from '../middlewares/registerGameMiddleware.js';

const router = Router();

router.post('/games', validateNewGame, registerGame);

router.get('/games', getGames);
export default router;
