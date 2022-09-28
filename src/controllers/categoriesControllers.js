import connection from '../databases/postgres.js';

export async function registerCategory(request, response) {
  const newCategory = request.body.name;

  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [newCategory]);
    return response.sendStatus(201);
  } catch {
    return response.sendStatus(500);
  }
}
