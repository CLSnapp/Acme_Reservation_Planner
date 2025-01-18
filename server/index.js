const { express, client } = require("./common");
const app = express();
const PORT = process.env.PORT || 3000;

// parse the body into JS Objects
app.use(express.json());

// Log the requests as they come in
app.use(require("morgan")("dev"));

const {
  createRestaurant,
  createCustomer,
  createReservation,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  destroyReservation,
} = require("./db");

/*Read Customers*/
app.get("/api/customers", async (req, res, next) => {
  try {
    res.status(200).json(await fetchCustomers());
  } catch (error) {
    next(error);
  }
});

/*Read Restaurants*/
app.get("/api/restaurants", async (req, res, next) => {
  try {
    res.status(200).json(await fetchRestaurants());
  } catch (error) {
    next(error);
  }
});

/*Read Reservations*/
app.get("/api/reservations", async (req, res, next) => {
  try {
    res.status(200).json(await fetchReservations());
  } catch (error) {
    next(error);
  }
});

/*Create Customers*/
app.post("/api/customers", async (req, res, next) => {
  try {
    const { name } = req.body;
    res.status(200).json(await createCustomer(name));
  } catch (error) {
    next(error);
  }
});

/*Create Restaurants*/
app.post("/api/restaurants", async (req, res, next) => {
  try {
    const { name } = req.body;
    res.status(200).json(await createRestaurant(name));
  } catch (error) {
    next(error);
  }
});

/*Create Reservation*/
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const { restaurants_id, customers_id, party_count, date } = req.body;
    res.status(200).json(
      await createReservation({
        restaurants_id,
        customers_id,
        party_count,
        date,
      })
    );
  } catch (error) {
    next(error);
  }
});

/*Delete Reservation*/
app.delete(
  "/api/customers/:customers_id/reservations/:id",
  async (req, res, next) => {
    try {
      const { id, customers_id } = req.params;
      res.status(204).json(await destroyReservation({ id, customers_id }));
    } catch (error) {
      next(error);
    }
  }
);

app.listen(PORT, async () => {
  await client.connect();
  console.log(`I am listening on port number ${PORT}`);
});
