import joi from 'joi';

const customerSchema = joi.object({
  name: joi.string().trim().required().min(1),
  phone: joi
    .string()
    .pattern(/^[0-9]+$/)
    .trim()
    .min(10)
    .max(11),
  cpf: joi
    .string()
    .pattern(/^[0-9]+$/)
    .trim()
    .length(11),
  birthday: joi.date()
});

export default customerSchema;
