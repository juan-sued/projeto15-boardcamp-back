import connection from '../databases/postgres.js';
import gameSchema from '../schemas/gameSchema.js';

async function validateNewGame(request, response, next) {
  const newGame = request.body;

  const validate = gameSchema.validate(newGame, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const QUERY_BASIC = 'SELECT * FROM ';

    const { rows: games } = await connection.query(QUERY_BASIC + 'games');

    const isNameRegistered = games.some(game => game.name === newGame.name);

    if (isNameRegistered) return response.sendStatus(409);

    //========================================================================

    const categories = await connection.query(QUERY_BASIC + 'categories WHERE id = $1', [
      newGame.categoryId
    ]);

    if (categories.rowCount === 0)
      return response.status(400).send('não existe categoria esse id');

    next();
  } catch {
    response.status(500).send('erro ao validar game');
  }
}

export default validateNewGame;
