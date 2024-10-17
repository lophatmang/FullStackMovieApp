const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authUser = require("./middleware/authUser");

const movieListRouter = require("./routes/movieList");

const app = express();

app.use(cors(), bodyParser.json());

app.use(authUser);

app.use("/api/movieList", movieListRouter);

app.use((req, res, next) => {
  res.status(404).json({ errorMessage: "Route not found" });
});

app.listen(3100);
