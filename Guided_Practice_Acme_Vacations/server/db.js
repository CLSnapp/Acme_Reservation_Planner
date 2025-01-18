const { client } = require("./common");

const createUser = async (name) => {
  const SQL = `
      INSERT INTO users(name) VALUES($1) RETURNING *
    `;
  const response = await client.query(SQL, [name]);
  return response.rows[0];
};

const createPlace = async (name) => {
  const SQL = `
      INSERT INTO places(name) VALUES($1) RETURNING *
    `;
  const response = await client.query(SQL, [name]);
  return response.rows[0];
};

const createVacation = async ({ places_id, users_id, departure_date }) => {
  const SQL = `
      INSERT INTO vacations(places_id, users_id, departure_date) VALUES($1, $2, $3) RETURNING *
    `;
  const response = await client.query(SQL, [
    places_id,
    users_id,
    departure_date,
  ]);
  return response.rows[0];
};

const fetchUsers = async () => {
  const SQL = `
    SELECT * FROM users
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchPlaces = async () => {
  const SQL = `
      SELECT * FROM places
      `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchVacations = async () => {
  const SQL = `
      SELECT * FROM vacations
      `;
  const response = await client.query(SQL);
  return response.rows;
};

const deleteVacations = async ({ id, users_id }) => {
  const SQL = `
        DELETE FROM vacations
        WHERE id = $1 AND users_id=$2
        `;
  const response = await client.query(SQL, [id, users_id]);
  return response.rows;
};

module.exports = {
  createPlace,
  createUser,
  createVacation,
  fetchUsers,
  fetchPlaces,
  fetchVacations,
  deleteVacations,
};
