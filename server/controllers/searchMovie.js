const MovieList = require("../models/movieList");
const paginate = require("../utils/paging");
const GenreList = require("../models/genreList");
const pageSize = 20;

exports.searchMovie = (req, res, next) => {
  const keyword = req.body;

  const page = req.query.page || 1;

  MovieList((movieList) => {
    if (!keyword)
      return res.status(400).json({ errorMessage: "Not found keyword parram" });

    const movies = movieList
      .filter((e) =>
        keyword.title == "all"
          ? true
          : e.overview?.toLowerCase().includes(keyword.title?.toLowerCase()) ||
            e.title?.toLowerCase().includes(keyword.title?.toLowerCase())
      )
      .filter((e) =>
        keyword.genre == "all"
          ? true
          : e.genre_ids.find((genreId) => genreId == keyword.genre)
      )
      .filter((e) =>
        keyword.mediaType == "all" ? true : e.media_type == keyword.mediaType
      )
      .filter((e) =>
        keyword.language == "all"
          ? true
          : e.original_language == keyword.language
      )
      .filter((e) =>
        keyword.year == "all"
          ? true
          : e.release_date?.slice(0, 4) == keyword.year ||
            e.first_air_date?.slice(0, 4) == keyword.year
      );
    if (movies.length == 0)
      return res.status(404).json({ errorMessage: "Not found Movie" });

    res.status(200).json({
      results: paginate(movies, page, pageSize),
      page: page,
      total_pages: Math.ceil(movies.length / pageSize),
    });
  });
};
