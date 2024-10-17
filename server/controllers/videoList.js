const VideoList = require("../models/videoList");

exports.getvideoTrailer = (req, res, next) => {
  const filmId = req.body.film_id;

  VideoList((videoList) => {
    if (!filmId)
      return res.status(400).json({ ErrorMessage: "Not found film_id parram" });

    const film = videoList.find((e) => e.id == filmId);
    if (!film) return res.status(404).json({ ErrorMessage: "Not found video" });

    const videos = film.videos
      .filter((e) => e.official == true && e.site == "YouTube")
      .filter((e) => ["Trailer", "Teaser"].includes(e.type))
      .sort((a, b) => b.type.length - a.type.length);

    if (videos.length == 0) {
      return res.status(404).json({ ErrorMessage: "Not found video" });
    } else {
      return res.status(200).json(videos[0]);
    }
  });
};
