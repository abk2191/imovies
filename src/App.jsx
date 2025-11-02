import { useState, useEffect } from "react";
import Popularmovies from "./Popularmovies";
import Trendingmovies from "./Trendingmovies";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Searchforamovie from "./Searchforamovie";
import MultiSearch from "./Multisearch";

function App() {
  return (
    <>
      <div className="logo">iMovies</div>
      <Router basename="/imovies">
        {" "}
        {/* ADD THIS BASENAME PROP */}
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
              to="/" // This will now resolve to /imovies/
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
              to="/search" // This will now resolve to /imovies/search
              style={{
                margin: "10px",
                fontFamily: "Inter, sans-serif",
                color: "#a8a821",
                fontSize: "30px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Search
            </Link>
            <Link
              to="/trending" // This will now resolve to /imovies/trending
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
            <Route path="/search" element={<MultiSearch />} />
            <Route path="/trending" element={<Trendingmovies />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
