import dayjs from 'dayjs';
import connection from '../databases/postgres.js';

export async function registerRental(request, response) {
  const newRental = request.body;
  const { gameSelected } = response.locals;
  const daysRentedCount = newRental.daysRented;
  const today = dayjs().format('YYYY-MM-DD');

  try {
    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES
      (${newRental.customerId},
      ${newRental.gameId},
      '${today}',
      ${daysRentedCount},
      ${null},
      ${gameSelected[0].pricePerDay},
      ${null}
      );`
    );
    return response.sendStatus(201);
  } catch {
    return response.status(500).send('erro ao registrar rental');
  }
}

export async function getRentals(request, response) {
  const { gameId } = request.query;
  const { customerId } = request.query;

  const QUERY_BASIC = `SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.name AS "categoryName", categories.id AS "categoryId" FROM rentals JOIN games ON rentals."gameId" = games.id JOIN customers ON rentals."customerId" = customers.id JOIN categories ON categories.id = games."categoryId"`;
  const rentalsJoin = [];

  try {
    if (!!gameId) {
      const { rows: rentalsForGame } = await connection.query(
        QUERY_BASIC + ` WHERE games.id = $1;`,
        [gameId]
      );
      if (!rentalsForGame) return response.sendStatus(404);
      for (let rental of rentalsForGame) {
        rentalsJoin.push({
          id: rental.id,
          customerId: rental.customerId,
          gameId: rental.gameId,
          rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
          daysRented: rental.daysRented,
          returnDate: rental.returnDate,
          originalPrice: rental.originalPrice,
          delayFee: rental.delayFee,
          customer: {
            id: rental.customerId,
            name: rental.customerName
          },
          game: {
            id: rental.gameId,
            name: rental.gameName,
            categoryId: rental.categoryId,
            categoryName: rental.categoryName
          }
        });
      }

      return response.status(200).send(rentalsJoin);
    }
    //===================================================================
    else if (!!customerId) {
      const { rows: rentalsForCustomer } = await connection.query(
        QUERY_BASIC + ` WHERE customers.id = $1;`,
        [customerId]
      );

      if (!rentalsForCustomer) return response.sendStatus(404);
      for (let rental of rentalsForCustomer) {
        rentalsJoin.push({
          id: rental.id,
          customerId: rental.customerId,
          gameId: rental.gameId,
          rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
          daysRented: rental.daysRented,
          returnDate: rental.returnDate,
          originalPrice: rental.originalPrice,
          delayFee: rental.delayFee,
          customer: {
            id: rental.customerId,
            name: rental.customerName
          },
          game: {
            id: rental.gameId,
            name: rental.gameName,
            categoryId: rental.categoryId,
            categoryName: rental.categoryName
          }
        });
      }

      return response.status(200).send(rentalsJoin);
    }

    //====================================================================
    else {
      const { rows: allRentals } = await connection.query(QUERY_BASIC + ';');
      if (!allRentals) return response.sendStatus(404);

      for (let rental of allRentals) {
        rentalsJoin.push({
          id: rental.id,
          customerId: rental.customerId,
          gameId: rental.gameId,
          rentDate: dayjs(rental.rentDate).format('YYYY-MM-DD'),
          daysRented: rental.daysRented,
          returnDate: rental.returnDate,
          originalPrice: rental.originalPrice,
          delayFee: rental.delayFee,
          customer: {
            id: rental.customerId,
            name: rental.customerName
          },
          game: {
            id: rental.gameId,
            name: rental.gameName,
            categoryId: rental.categoryId,
            categoryName: rental.categoryName
          }
        });
      }

      return response.status(200).send(rentalsJoin);
    }
  } catch {
    return response.sendStatus(500);
  }
}
