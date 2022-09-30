import connection from '../databases/postgres.js';
import customerSchema from '../schemas/customerSchema.js';

async function ValidateNewCustomer(request, response, next) {
  const newCustomer = request.body;

  const validate = customerSchema.validate(newCustomer, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const QUERY = 'SELECT * FROM customers';

    const { rows: customers } = await connection.query(QUERY);

    const isCPFRegistered = customers.some(customer => customer.cpf === newCustomer.cpf);
    if (isCPFRegistered) return response.sendStatus(409);

    next();
  } catch {
    return response.status(500).send('erro ao buscar customers');
  }
}

export default ValidateNewCustomer;
