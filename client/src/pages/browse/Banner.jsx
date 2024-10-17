import React, { useMemo } from "react";
import classes from "./Browse.module.css";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Banner(props) {
  const randomMovie = useMemo(() => {
    if (props.original) {
      return props.original[
        Math.floor(Math.random() * props.original.length - 1)
      ];
    }
  }, [props.original]);

  return (
    <>
      {!props.error && !props.loading && props.original && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path}`}
          />
          <div className={classes.tilte}>
            <h1>{randomMovie.name}</h1>
            <button>Play</button>
            <button>My List</button>
            <p>
              {randomMovie.overview &&
                `${randomMovie.overview.slice(0, 200)}...`}
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default Banner;
