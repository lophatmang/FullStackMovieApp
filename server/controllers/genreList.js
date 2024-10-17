const MovieList = require("../models/movieList");
const GenreList = require("../models/genreList");
const paginate = require("../utils/paging");

const pageSize = 20;

exports.getGenreList = (req, res, next) => {
  const page = req.query.page || 1;
  const genre = req.query.genre;
  if (genre) {
    GenreList((genreList) => {
      const genreFind = genreList.find((e) => e.id == genre);
      if (genreFind) {
        MovieList((movieList) => {
          const movieGenre = movieList.filter((e) =>
            e.genre_ids.find((genreId) => genreId == genreFind.id)
          );
          res.status(200).json({
            results: paginate(movieGenre, page, pageSize),
            page: page,
            total_pages: Math.ceil(movieGenre.length / pageSize),
            genre_name: genreFind.name,
          });
        });
      } else {
        res.status(400).json({ errorMessage: "Not found that gerne id" });
      }
    });
  } else {
    res.status(400).json({ errorMessage: "Not found gerne parram" });
  }
};

exports.getGenres = (req, res, next) => {
  GenreList((genreList) => {
    res.status(200).json(genreList);
  });
};
