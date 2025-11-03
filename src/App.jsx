import { useState, useEffect } from "react";
import Popularmovies from "./Popularmovies";
import Trendingmovies from "./Trendingmovies";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Searchforamovie from "./Searchforamovie";
import MultiSearch from "./Multisearch";
import Sidebar from "./Sidebar";

function App() {
  const [showsidebar, setShowsidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [isSearchOn, setIsSearchOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [multisearchvisibility, setMultisearchVisibility] = useState(false);

  const handlesearchclose = () => {
    setIsSearchOn(true);
    setMultisearchVisibility(false);
  };

  const handleSearch = () => {
    setIsSearchOn(false);
    setMultisearchVisibility(true);
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=3e34829ad355424421b39a1a3162baa0&query=${encodeURIComponent(
        searchQuery
      )}`
    )
      .then((response) => response.json())
      .then((jsondata) => {
        setData(jsondata);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <div className="nav">
          <h1>iMovies</h1>
          <div className="searchdiv">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, TV shows, and people..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>

        {multisearchvisibility && (
          <MultiSearch data={data} handlesearchclose={handlesearchclose} />
        )}

        {isSearchOn && <Popularmovies />}
        {isSearchOn && <Trendingmovies />}
      </div>
    </>
  );
}

export default App;
