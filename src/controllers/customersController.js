import connection from '../databases/postgres.js';

export async function registerCustomer(request, response) {
  const newCustomer = request.body;
  console.log(newCustomer);
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
