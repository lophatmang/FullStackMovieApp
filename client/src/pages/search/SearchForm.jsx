import classes from "./Search.module.css";
import swal from "sweetalert";
import { userToken } from "../../App";
import React, { useEffect, useState } from "react";
import MovieDetail from "../browse/MovieDetail";

function SearchForm() {
  const [resultList, setResultList] = useState();
  const [detail, setDetail] = useState();
  const [genreList, setGenreList] = useState();
  useEffect(async () => {
    try {
      const res = await fetch(
        `http://localhost:3100/api/movieList/genre-list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: userToken,
          },
          redirect: "follow",
        }
      );
      const data = await res.json();

      setGenreList(data);
    } catch (e) {
      console.error(`lỗi là: ${e}`);
    }
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setDetail("");

    const body = {
      title: e.target.title.value || "all",
      genre: e.target.genre.value || "all",
      mediaType: e.target.mediaType.value || "all",
      language: e.target.language.value || "all",
      year: e.target.year.value || "all",
    };
    try {
      const res = await fetch(`http://localhost:3100/api/movieList/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify(body),
        redirect: "follow",
      });
      const data = await res.json();
      setResultList(data);
    } catch (e) {
      console.error(`lỗi API là: ${e}`);
    }
  }

  return (
    <>
      <div style={{ padding: "80px", paddingBottom: "0px" }}>
        <form onSubmit={onSubmit} className={classes.searchForm}>
          <div style={{ borderBottom: "3px solid #00bbec" }}>
            <div className={classes.input}>
              <label>Title</label>
              <input type="text" name="title" />
              <label>Genre</label>
              <select name="genre">
                <option value="">Select Genre</option>
                {genreList &&
                  genreList.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
              </select>
              <label>Media Type</label>
              <div>
                <div>
                  <input type="radio" name="mediaType" value="movie" />
                  <label>Movie</label>
                </div>
                <div>
                  <input type="radio" name="mediaType" value="tv" />
                  <label>TV</label>
                </div>
                <div>
                  <input type="radio" name="mediaType" value="person" />
                  <label>Person</label>
                </div>
              </div>
              <label>Language</label>
              <div>
                <div>
                  <input type="radio" name="language" value="en" />
                  <label>English</label>
                </div>
                <div>
                  <input type="radio" name="language" value="ja" />
                  <label>Japanese</label>
                </div>
                <div>
                  <input type="radio" name="language" value="ko" />
                  <label>Korean</label>
                </div>
              </div>
              <label>Year</label>
              <input type="number" name="year" />
            </div>
          </div>
          <div className={classes.buttonFrom}>
            <button type="reset">RESET</button>
            <button
              type="submit"
              style={{ backgroundColor: "#00bbec", color: "white" }}
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
      <ResultList
        setDetail={setDetail}
        detail={detail}
        resultList={resultList}
      />
    </>
  );
}

function ResultList(props) {
  function checkMovie(movie) {
    if (props.detail && props.detail.id == movie.id) {
      props.setDetail(null);
    } else {
      props.setDetail(movie);
    }
  }
  return (
    <div className={classes.resultList}>
      {props.resultList && (
        <>
          <h1>Search Result</h1>
          <div className={classes.listMovie}>
            {props.resultList && !props.resultList.errorMessage ? (
              props.resultList.results.map(
                (e) =>
                  e.backdrop_path && (
                    <img
                      className={classes.img}
                      key={e.id}
                      src={`https://image.tmdb.org/t/p/w200/${e.poster_path}`}
                      onClick={() => checkMovie(e)}
                    />
                  )
              )
            ) : (
              <h2>{props.resultList.errorMessage}</h2>
            )}
          </div>
        </>
      )}
      {props.detail && <MovieDetail movie={props.detail} />}
    </div>
  );
}

export default SearchForm;
