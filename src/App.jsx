import { useState, useEffect } from "react";
import Popularmovies from "./Popularmovies";
import Trendingmovies from "./Trendingmovies";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Searchforamovie from "./Searchforamovie";

function App() {
  return (
    <>
      <div className="logo">iMovies</div>
      <Router>
        <div>
          {/* Navigation */}
          <nav
            style={{
              padding: "20px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            <Link
              to="/"
              style={{
                margin: "10px",

                fontFamily: "Inter, sans-serif",
                color: "#a8a821",
                fontSize: "30px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Popular Movies
            </Link>
            <Link
              to="/search"
              style={{
                margin: "10px",

                fontFamily: "Inter, sans-serif",
                color: "#a8a821",
                fontSize: "30px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Search a Movie
            </Link>
            <Link
              to="/trending"
              style={{
                margin: "10px",

                fontFamily: "Inter, sans-serif",
                color: "#a8a821",
                fontSize: "30px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Trending Movies
            </Link>
          </nav>

          {/* Route Configuration */}
          <Routes>
            <Route path="/" element={<Popularmovies />} />
            <Route path="/search" element={<Searchforamovie />} />
            <Route path="/trending" element={<Trendingmovies />} />
          </Routes>
        </div>
      </Router>
      {/* <Popularmovies /> */}
      {/* <Trendingmovies /> */}
    </>
  );
}

export default App;
