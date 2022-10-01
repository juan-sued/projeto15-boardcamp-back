import connection from '../databases/postgres.js';
import rentalSchema from '../schemas/rentalSchema.js';

async function validateRental(request, response, next) {
  const newRental = request.body;

  const validate = rentalSchema.validate(newRental, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const QUERY_BASIC = 'SELECT * FROM ';

    const { rows: customer } = await connection.query(
      QUERY_BASIC + `customers WHERE customers.id = ${newRental.customerId};`
    );
    if (!customer) return response.sendStatus(400);

    const { rows: searhGameAndDisponibility } = await connection.query(
      QUERY_BASIC +
        `games JOIN rentals ON games.id = rentals."gameId" WHERE games.id = ${newRental.gameId};`
    );

    if (!searhGameAndDisponibility) {
      return response.sendStatus(400);
    } else if (searhGameAndDisponibility.length >= gameSelected[0].stockTotal) {
      response.sendStatus(400);
    } else {
      response.locals.gameSelected = gameSelected;
      next();
    }
  } catch {
    response.status(500).send('erro ao validar rentals');
  }
}

export default validateRental;
