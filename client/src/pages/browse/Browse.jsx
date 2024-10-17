import React from "react";
import classes from "./Browse.module.css";
import { requests, useFecth } from "../../App";

import NavBar from "./NavBar";
import Banner from "./Banner";
import MovieList from "./MovieList";

function Browse() {
  const {
    data: original,
    error,
    loading,
  } = useFecth(requests.fetchNetflixOriginals);
  const { data: trending } = useFecth(requests.fetchTrending);
  const { data: topRated } = useFecth(requests.fetchTopRated);
  const { data: actionMovies } = useFecth(requests.fetchActionMovies);
  const { data: comedyMovies } = useFecth(requests.fetchComedyMovies);
  const { data: horrorMovies } = useFecth(requests.fetchHorrorMovies);
  const { data: romanceMovies } = useFecth(requests.fetchRomanceMovies);
  const { data: documentaries } = useFecth(requests.fetchDocumentaries);

  return (
    <div className={classes.app}>
      <div style={{ position: "relative" }}>
        <NavBar />
        <Banner error={error} loading={loading} original={original} />
      </div>
      <MovieList
        error={error}
        loading={loading}
        original={original}
        trending={trending}
        topRated={topRated}
        actionMovies={actionMovies}
        comedyMovies={comedyMovies}
        horrorMovies={horrorMovies}
        romanceMovies={romanceMovies}
        documentaries={documentaries}
      />
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default Browse;
