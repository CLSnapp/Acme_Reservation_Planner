const { express, client } = require("./common");
const app = express();
const PORT = process.env.PORT || 3000;

// parse the body into JS Objects
app.use(express.json());

// Log the requests as they come in
app.use(require("morgan")("dev"));
const {
  createPlace,
  createUser,
  createVacation,
  fetchUsers,
  fetchPlaces,
  fetchVacations,
  deleteVacations,
} = require("./db");

/*Read Users*/
app.get("/api/users", async (req, res, next) => {
  try {
    res.status(200).json(await fetchUsers());
  } catch (error) {
    next(error);
  }
});

/*Read Places*/
app.get("/api/places", async (req, res, next) => {
  try {
    res.status(200).json(await fetchPlaces());
  } catch (error) {
    next(error);
  }
});

/*Read Vacations*/
app.get("/api/vacations", async (req, res, next) => {
  try {
    res.status(200).json(await fetchVacations());
  } catch (error) {
    next(error);
  }
});

/*Create Users*/
app.post("/api/users", async (req, res, next) => {
  try {
    const { name } = req.body;
    res.status(200).json(await createUser(name));
  } catch (error) {
    next(error);
  }
});

/*Create Places*/
app.post("/api/places", async (req, res, next) => {
  try {
    const { name } = req.body;
    res.status(200).json(await createPlace(name));
  } catch (error) {
    next(error);
  }
});

/*Create Vacations*/
app.post("/api/users/:users_id/vacations", async (req, res, next) => {
  try {
    const { places_id, users_id, departure_date } = req.body;
    res
      .status(200)
      .json(await createVacation({ places_id, users_id, departure_date }));
  } catch (error) {
    next(error);
  }
});

/*Delete Vacations*/
app.delete("/api/users/:users_id/vacations/:id", async (req, res, next) => {
  try {
    const { id, users_id } = req.params;
    res.status(204).json(await deleteVacations({ id, users_id }));
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, async () => {
  await client.connect();
  console.log(`I am listening on port number ${PORT}`);
});
