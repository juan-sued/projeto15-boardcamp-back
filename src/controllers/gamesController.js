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
