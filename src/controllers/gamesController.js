import connection from '../databases/postgres.js';

export async function registerGame(request, response) {
  const newGame = request.body;

  try {
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES
      ('${newGame.name}',
      '${newGame.image}',
      ${newGame.stockTotal},
      ${newGame.categoryId},
      ${newGame.pricePerDay})`
    );

    return response.sendStatus(201);
  } catch {
    return response.status(500).send('erro ao adicionar game');
  }
}

export async function getGames(request, response) {
  const { name } = request.query;

  const QUERY_BASIC =
    'SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id';

  try {
    const query = !!name
      ? QUERY_BASIC + ` WHERE games.name ILIKE '${name}%'`
      : QUERY_BASIC;

    const { rows: games } = await connection.query(query + ';');

    return response.status(200).send(games);
  } catch {
    return response.status(500).send('erro ao pegar games');
  }
}
