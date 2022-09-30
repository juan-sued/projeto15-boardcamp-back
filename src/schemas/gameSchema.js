import joi from 'joi';

const gameSchema = joi.object({
  name: joi.string().trim().required(),
  image: joi.string().trim(),
  stockTotal: joi.number().integer().min(0),
  categoryId: joi.number().integer().min(0),
  pricePerDay: joi.number().integer().min(1)
});
export default gameSchema;
