const MovieList = require("../models/movieList");
const paginate = require("../utils/paging");
const pageSize = 20;

exports.getMovieTrending = (req, res, next) => {
  const page = req.query.page || 1;
  MovieList((movieList) => {
    const trending = movieList.sort((a, b) => b.popularity - a.popularity);
    res.status(200).json({
      results: paginate(trending, page, pageSize),
      page: page,
      total_pages: Math.ceil(trending.length / pageSize),
    });
  });
};

exports.getMovietopRate = (req, res, next) => {
  const page = req.query.page || 1;
  MovieList((movieList) => {
    const trending = movieList.sort((a, b) => b.vote_average - a.vote_average);
    res.status(200).json({
      results: paginate(trending, page, pageSize),
      page: page,
      total_pages: Math.ceil(trending.length / pageSize),
    });
  });
};
