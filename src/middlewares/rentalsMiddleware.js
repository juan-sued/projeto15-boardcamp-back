import connection from '../databases/postgres.js';
import rentalSchema from '../schemas/rentalSchema.js';

export async function validateRental(request, response, next) {
  const newRental = request.body;

  const validate = rentalSchema.validate(newRental, { abortEarly: false });
  const { error } = validate;
  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  if (newRental.daysRented < 0) return response.sendStatus(400);

  try {
    const QUERY_BASIC = 'SELECT * FROM ';

    const { rows: customer } = await connection.query(
      QUERY_BASIC + `customers WHERE customers.id = $1;`,
      [newRental.customerId]
    );

    if (!customer) return response.sendStatus(400);

    //========================================================

    const { rows: gameSelected } = await connection.query(
      QUERY_BASIC + `games WHERE games.id = $1;`,
      [newRental.gameId]
    );

    if (!gameSelected) return response.sendStatus(400);

    //==========================================================

    const { rows: rentals } = await connection.query(
      QUERY_BASIC + `rentals WHERE rentals."gameId" = $1`,
      [newRental.gameId]
    );

    if (!rentals) {
      return response.sendStatus(400);
    } else if (rentals.length >= gameSelected[0].stockTotal) {
      response.sendStatus(400);
    } else {
      response.locals.gameSelected = gameSelected;
      next();
    }
  } catch {
    response.status(500).send('erro ao validar rentals');
  }
}

export async function validateReturnRental(request, response, next) {
  const { idRental } = request.params;
  const query = `SELECT * FROM rentals JOIN games ON games.id = rentals."gameId" WHERE rentals.id = $1;`;
  try {
    const { rows: rentalSelected } = await connection.query(query, [idRental]);

    if (rentalSelected.length === 0) return response.sendStatus(404);
    response.locals.rentalSelected = rentalSelected;
    next();
  } catch {
    response.status(500).send('erro ao validar return');
  }
}
export async function validateDeleteRental(request, response, next) {
  const { idRental } = request.params;
  const query = `SELECT * FROM rentals WHERE rentals.id = $1;`;
  try {
    const { rows: rentalSelected } = await connection.query(query, [idRental]);

    if (!rentalSelected[0]) return response.sendStatus(404);

    if (rentalSelected[0].returnDate === null) {
      return response.sendStatus(400);
    }

    response.locals.rentalSelected = rentalSelected;
    next();
  } catch {
    response.status(500).send('erro ao validar return');
  }
}
