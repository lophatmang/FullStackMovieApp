import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import NavBar from "./pages/browse/NavBar";

export const userToken = "RYoOcWM4JW";
export const requests = {
  fetchTrending: `trending`,
  fetchNetflixOriginals: `trending?page=1`,
  fetchTopRated: `top-rate?page=1`,
  fetchActionMovies: `discover?genre=28`,
  fetchComedyMovies: `discover?genre=35`,
  fetchHorrorMovies: `discover?genre=27`,
  fetchRomanceMovies: `discover?genre=10749`,
  fetchDocumentaries: `discover?genre=99`,
};

export function useFecth(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:3100/api/movieList/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        redirect: "follow",
      });
      const data = await res.json();

      setData(data.results);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, [url]);

  return {
    data,
    error,
    loading,
  };
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function PageNotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <NavBar />
      <img
        style={{ margin: "20% 0" }}
        src="notFound.png"
        alt="Page Not Found"
      />
    </div>
  );
}
export default App;
