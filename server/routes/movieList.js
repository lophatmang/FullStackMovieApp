const express = require("express");
const movieListController = require("../controllers/movieList");
const genreListController = require("../controllers/genreList");
const videoListController = require("../controllers/videoList");
const searchMovieController = require("../controllers/searchMovie");

const router = express.Router();

router.get("/trending", movieListController.getMovieTrending);

router.get("/top-rate", movieListController.getMovietopRate);

router.get("/discover", genreListController.getGenreList);

router.post("/video", videoListController.getvideoTrailer);

router.post("/search", searchMovieController.searchMovie);

router.get("/genre-list", genreListController.getGenres);

module.exports = router;
