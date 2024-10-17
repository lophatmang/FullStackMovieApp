import React, { useEffect, useState } from "react";
import classes from "./Browse.module.css";

import MovieDetail from "./MovieDetail";

function MovieList(props) {
  const [detail, setDetail] = useState();

  function checkMovie(movie) {
    if (detail && detail.id === movie.id) {
      setDetail(null);
    } else {
      setDetail(movie);
    }
  }

  useEffect(() => {
    const imgList = document.querySelectorAll(".imgStyle");

    function scrollY(e) {
      e.preventDefault();
      const locationCode = e.currentTarget.closest(".imgStyle");

      if (e.deltaY < 0) {
        locationCode.scrollLeft -= 100;
      } else {
        locationCode.scrollLeft += 100;
      }
    }

    for (let i = 0; i < imgList.length; i++) {
      imgList[i].addEventListener("wheel", scrollY);
    }
    return () => {
      for (let i = 0; i < imgList.length; i++) {
        imgList[i].removeEventListener("wheel", scrollY);
      }
    };
  }, []);

  return (
    <div>
      <div className={`${classes.movieList} imgStyle`}>
        {!props.error &&
          !props.loading &&
          props.original &&
          props.original.map(
            (e) =>
              e.poster_path && (
                <img
                  className={classes.img}
                  key={e.id}
                  src={`https://image.tmdb.org/t/p/w200/${e.poster_path}`}
                  onClick={() => checkMovie(e)}
                />
              )
          )}
      </div>
      {detail && <MovieDetail movie={detail} />}
      <Img title="Xu hướng" typeMovie={props.trending} />
      <Img title="Xếp hạng cao" typeMovie={props.topRated} />
      <Img title="Hành động" typeMovie={props.actionMovies} />
      <Img title="Hài" typeMovie={props.comedyMovies} />
      <Img title="Kinh dị" typeMovie={props.horrorMovies} />
      <Img title="Lãng mạn" typeMovie={props.romanceMovies} />
      <Img title="Tài liệu" typeMovie={props.documentaries} />
    </div>
  );
}

///component IMG
function Img(props) {
  const [detail, setDetail] = useState();

  function checkMovie(movie) {
    if (detail && detail.id === movie.id) {
      setDetail(null);
    } else {
      setDetail(movie);
    }
  }
  return (
    <>
      {props.title && <h3>{props.title}</h3>}
      <div className={`${classes.movieList} imgStyle`}>
        {props.typeMovie &&
          props.typeMovie.map(
            (e) =>
              e.backdrop_path && (
                <img
                  className={classes.img}
                  key={e.id}
                  src={`https://image.tmdb.org/t/p/w200/${e.backdrop_path}`}
                  onClick={() => checkMovie(e)}
                />
              )
          )}
      </div>
      {detail && <MovieDetail movie={detail} />}
    </>
  );
}

export default MovieList;
