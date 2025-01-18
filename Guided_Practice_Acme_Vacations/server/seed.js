const { client } = require("./common");
const { fetchUsers, fetchPlaces, fetchVacations } = require("./db");

const seed = async () => {
  try {
    await client.connect();
    console.log("connected to database");

    const SQL = `
    DROP TABLE IF EXISTS vacations;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS places;

    CREATE TABLE users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE
    );
    INSERT INTO users(name) VALUES
    ('Cory Johnson'),
    ('Rebecca Miles'),
    ('Jason Shepard'),
    ('Diablo Guild'),
    ('Larry Bird');

    CREATE TABLE places(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL UNIQUE
    );
    INSERT INTO places(name) VALUES
    ('Hawaii'),
    ('Colorado'),
    ('California'),
    ('Oklahoma'),
    ('New York');

    CREATE TABLE vacations(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        departure_date DATE NOT NULL,
        users_id UUID REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
        places_id UUID REFERENCES places(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL
    );
    INSERT INTO vacations(users_id, places_id, departure_date) VALUES
    ((SELECT id FROM users WHERE name = 'Cory Johnson'), (SELECT id FROM places WHERE name ='Hawaii'), '02/14/2024'),
    ((SELECT id FROM users WHERE name = 'Cory Johnson'), (SELECT id FROM places WHERE name ='Oklahoma'), '02/14/2024'),
    ((SELECT id FROM users WHERE name = 'Jason Shepard'), (SELECT id FROM places WHERE name ='California'), '02/14/2024'),
    ((SELECT id FROM users WHERE name = 'Larry Bird'), (SELECT id FROM places WHERE name ='New York'), '02/28/2024'),
    ((SELECT id FROM users WHERE name = 'Diablo Guild'), (SELECT id FROM places WHERE name ='Hawaii'), '02/28/2024'),
    ((SELECT id FROM users WHERE name = 'Jason Shepard'), (SELECT id FROM places WHERE name ='Oklahoma'), '02/28/2024'),
    ((SELECT id FROM users WHERE name = 'Rebecca Miles'), (SELECT id FROM places WHERE name ='California'), '02/10/2024'),
    ((SELECT id FROM users WHERE name = 'Diablo Guild'), (SELECT id FROM places WHERE name ='Colorado'), '02/10/2024')
    `;

    await client.query(SQL);
    console.log("tables created and data seeded");
    console.log(await fetchUsers ());
    console.log(await fetchPlaces());
    console.log(await fetchVacations());
    await client.end();
  } catch (error) {
    console.log(error);
  }
};

seed();
