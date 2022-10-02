import connection from '../databases/postgres.js';

export async function registerCustomer(request, response) {
  const newCustomer = request.body;

  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES
      ('${newCustomer.name}',
      '${newCustomer.phone}',
      '${newCustomer.cpf}',
      '${newCustomer.birthday}');`
    );

    return response.sendStatus(201);
  } catch {
    return response.status(500).send('erro ao inserir customers');
  }
}

export async function getCustomers(request, response) {
  const { idCustomer } = request.params;
  const { cpf } = request.query;

  const QUERY_BASIC = 'SELECT * FROM customers';

  let query = QUERY_BASIC;

  try {
    if (!!cpf) {
      query += ` WHERE customers.cpf ILIKE '${cpf}%'`;
    } else if (!!idCustomer) {
      query += ` WHERE customers.id = ${idCustomer}`;
    }
    const { rows: customer } = await connection.query(query + ';');

    if (!customer) return response.sendStatus(404);

    return response.status(200).send(customer);
  } catch {
    return response.sendStatus(500);
  }
}

export async function updateCustomers(request, response) {
  const newCustomer = request.body;
  const { idCustomer } = request.params;
  try {
    await connection.query(
      `UPDATE customers SET name = '${newCustomer.name}', phone = '${newCustomer.phone}', cpf = '${newCustomer.cpf}', birthday = '${newCustomer.birthday}' WHERE customers.id = ${idCustomer};`
    );
    return response.sendStatus(200);
  } catch {
    return response.status(500).send('erro ao atualizar customers');
  }
}
