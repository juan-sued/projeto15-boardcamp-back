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
    return;
  } catch {
    return response.status(500).send('erro ao registrar rental');
  }
}
