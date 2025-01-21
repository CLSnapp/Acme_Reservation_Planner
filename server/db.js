const { client } = require("./common");

const createCustomer = async (name) => {
  const SQL = `
      INSERT INTO customers(name) VALUES($1) RETURNING *
    `;
  const response = await client.query(SQL, [name]);
  return response.rows[0];
};

const createRestaurant = async (name) => {
  const SQL = `
      INSERT INTO restaurants(name) VALUES($1) RETURNING *
    `;
  const response = await client.query(SQL, [name]);
  return response.rows[0];
};

const createReservation = async ({
  restaurants_id,
  customers_id,
  party_count,
  date,
}) => {
  const SQL = `
      INSERT INTO reservations(restaurants_id, customers_id, party_count, date) VALUES($1, $2, $3, $4) RETURNING *
    `;
  const response = await client.query(SQL, [
    restaurants_id,
    customers_id,
    party_count,
    date,
  ]);
  return response.rows[0];
};

const fetchCustomers = async () => {
  const SQL = `
    SELECT * FROM customers
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchRestaurants = async () => {
  const SQL = `
      SELECT * FROM restaurants
      `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchReservations = async () => {
  const SQL = `
      SELECT * FROM reservations
      `;
  const response = await client.query(SQL);
  return response.rows;
};

const destroyReservation = async ({ id, customers_id }) => {
  const SQL = `
        DELETE FROM reservations
        WHERE id = $1 AND customers_id=$2
        `;
  const response = await client.query(SQL, [id, customers_id]);
  return response.rows;
};

const destroyCustomer = async (id) => {
  const SQL = `
        DELETE FROM customers
        WHERE id = $1 
        `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

const destroyRestaurant = async (id) => {
  const SQL = `
        DELETE FROM restaurants
        WHERE id = $1 
        `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

module.exports = {
  createRestaurant,
  createCustomer,
  createReservation,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  destroyReservation,
  destroyCustomer,
  destroyRestaurant,
};
