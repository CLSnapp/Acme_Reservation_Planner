const { client } = require("./common");
const { fetchCustomers, fetchRestaurants, fetchReservations } = require("./db");

const createTables = async () => {
  try {
    await client.connect();
    console.log("connected to database");

    const SQL = `
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS restaurants;

    CREATE TABLE customers(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE
    );
    INSERT INTO customers(name) VALUES
    ('Hermione Granger'),
    ('Draco Malfoy'),
    ('Cedric Diggory'),
    ('Ron Weasley'),
    ('Albus Dumbledore'),
    ('Hedwig');

    CREATE TABLE restaurants(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE
    );
    INSERT INTO restaurants(name) VALUES
    ('Great Hall'),
    ('Hogs Head'),
    ('Three Broomsticks'),
    ('The Leaky Cauldron'),
    ('Honeydukes');

    CREATE TABLE reservations(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        customers_id UUID REFERENCES customers(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
        restaurants_id UUID REFERENCES restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL
    );
    INSERT INTO reservations(customers_id, restaurants_id, party_count, date) VALUES
    ((SELECT id FROM customers WHERE name = 'Hermione Granger'), (SELECT id FROM restaurants WHERE name ='Great Hall'), 12, '02/14/2025'),
    ((SELECT id FROM customers WHERE name = 'Draco Malfoy'), (SELECT id FROM restaurants WHERE name ='Hogs Head'), 10, '02/14/2025'),
    ((SELECT id FROM customers WHERE name = 'Draco Malfoy'), (SELECT id FROM restaurants WHERE name ='The Leaky Cauldron'), 8, '02/16/2025'),
    ((SELECT id FROM customers WHERE name = 'Albus Dumbledore'), (SELECT id FROM restaurants WHERE name ='Three Broomsticks'), 5, '02/28/2025'),
    ((SELECT id FROM customers WHERE name = 'Albus Dumbledore'), (SELECT id FROM restaurants WHERE name ='Great Hall'), 11, '02/28/2025'),
    ((SELECT id FROM customers WHERE name = 'Hermione Granger'), (SELECT id FROM restaurants WHERE name ='Honeydukes'), 18, '02/28/2025'),
    ((SELECT id FROM customers WHERE name = 'Ron Weasley'), (SELECT id FROM restaurants WHERE name ='Honeydukes'), 15, '02/10/2025'),
    ((SELECT id FROM customers WHERE name = 'Hedwig'), (SELECT id FROM restaurants WHERE name ='Three Broomsticks'), 2, '02/10/2025')
    `;

    await client.query(SQL);
    console.log("tables created and data seeded");
    console.log(await fetchCustomers());
    console.log(await fetchRestaurants());
    console.log(await fetchReservations());
    await client.end();
  } catch (error) {
    console.log(error);
  }
};

createTables();
