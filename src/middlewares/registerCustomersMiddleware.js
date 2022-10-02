import connection from '../databases/postgres.js';
import customerSchema from '../schemas/customerSchema.js';

async function ValidateNewCustomer(request, response, next) {
  const { idCustomer } = request.params;

  const newCustomer = request.body;

  const validate = customerSchema.validate(newCustomer, { abortEarly: false });
  const { error } = validate;

  if (error) {
    const errors = error.details.map(err => err.message);
    return response.status(400).send(errors);
  }

  try {
    const QUERY_BASIC = 'SELECT * FROM customers';
    let query = QUERY_BASIC;

    if (!!idCustomer) {
      query += ` WHERE customers.id = ${idCustomer}`;
    }

    const { rows: customers } = await connection.query(query + ';');

    const isCPFRegistered = customers.some(customer => customer.cpf === newCustomer.cpf);
    if (isCPFRegistered) return response.sendStatus(409);

    next();
  } catch {
    return response.status(500).send('erro ao buscar customers');
  }
}

export default ValidateNewCustomer;
