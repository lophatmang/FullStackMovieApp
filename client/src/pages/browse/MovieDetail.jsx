import React, { useEffect, useState } from "react";
import classes from "./Browse.module.css";
import { userToken } from "../../App";

function MovieDetail(props) {
  const [videoYoutube, setVideoYoutube] = useState();

  useEffect(() => {
    async function fetchApi() {
      try {
        const res = await fetch(`http://localhost:3100/api/movieList/video`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
          },
          body: JSON.stringify({ film_id: props.movie.id }),
          redirect: "follow",
        });

        if (!res.ok) setVideoYoutube("");
        const data = await res.json();

        setVideoYoutube(data);
      } catch (e) {
        console.error("Lỗi API: ", e);
      }
    }
    fetchApi();
  }, [props.movie]);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div className={classes.detailMovie}>
        <h1>{props.movie.name || props.movie.original_title}</h1>
        <p>
          <span>
            Release Date:{" "}
            {props.movie.release_date || props.movie.first_air_date}
          </span>
        </p>
        <p>
          <span>Vote: {props.movie.vote_average}/10</span>
        </p>
        <p>{props.movie.overview}</p>
      </div>
      <div>
        {videoYoutube ? (
          <iframe
            className={classes.youtube}
            src={`https://www.youtube.com/embed/${videoYoutube.key}`}
            allowFullScreen
          ></iframe>
        ) : (
          <img
            key={props.movie.id}
            src={`https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path}`}
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
