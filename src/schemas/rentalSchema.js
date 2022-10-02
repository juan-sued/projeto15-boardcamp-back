import joi from 'joi';

const rentalSchema = joi.object({
  customerId: joi.number().integer().min(0),
  gameId: joi.number().integer().min(0),
  daysRented: joi.number().integer().min(0)
});

export default rentalSchema;
