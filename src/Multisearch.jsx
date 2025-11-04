// MultiSearch.jsx
import { useState, useEffect } from "react";
import Cast from "./Cast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function MultiSearch({ data, handlesearchclose }) {
  //const [data, setData] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all", "movies", "tv", "people"

  console.log("Multi:", data);
  // Filter results based on active tab
  const filteredResults = data?.results?.filter((item) => {
    if (activeTab === "all") return true;
    return item.media_type === activeTab;
  });

  return (
    <div className="main-container">
      <button
        onClick={handlesearchclose}
        style={{
          color: "#a8a821",
          fontSize: "50px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      {/* <h1 style={{ fontFamily: "Inter, sans-serif", color: "#a8a821" }}>
        Search Movies & TV Shows
      </h1> */}

      {/* Search Input */}
      {/* <div className="search-div">
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
      </div> */}

      {/* Results Tabs */}
      {data && data.results && (
        <div className="results-tabs">
          <button
            className={activeTab === "all" ? "active" : ""}
            onClick={() => setActiveTab("all")}
          >
            All ({data.results.length})
          </button>
          <button
            className={activeTab === "movie" ? "active" : ""}
            onClick={() => setActiveTab("movie")}
          >
            Movies (
            {data.results.filter((item) => item.media_type === "movie").length})
          </button>
          <button
            className={activeTab === "tv" ? "active" : ""}
            onClick={() => setActiveTab("tv")}
          >
            TV Shows (
            {data.results.filter((item) => item.media_type === "tv").length})
          </button>
          <button
            className={activeTab === "person" ? "active" : ""}
            onClick={() => setActiveTab("person")}
          >
            People (
            {data.results.filter((item) => item.media_type === "person").length}
            )
          </button>
        </div>
      )}

      {/* Results */}

      {data && filteredResults && filteredResults.length > 0 && (
        <div className="multi-results">
          {filteredResults.map((item) => (
            <div
              key={`${item.media_type}-${item.id}`}
              className="search-result-card" // CHANGED: Use different class name
            >
              {/* Movie Result */}
              {/* Movie Result */}
              {item.media_type === "movie" && (
                <div className="movie-result">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : "https://via.placeholder.com/300x450/333/fff?text=No+Poster"
                    }
                    alt={item.title}
                    className="search-result-image"
                  />
                  <div className="search-result-info">
                    <h3>{item.title}</h3>
                    <p className="media-type">Movie</p>
                    <p>Rating: {item.vote_average}</p>
                    <p>Release: {item.release_date}</p>
                    <Cast movieId={item.id} mediaType="movie" />{" "}
                    {/* Fixed: added mediaType */}
                    <p className="overview">{item.overview}</p>
                  </div>
                </div>
              )}
              {/* TV Show Result */}
              {item.media_type === "tv" && (
                <div className="tv-result">
                  <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : "https://via.placeholder.com/300x450/333/fff?text=No+Poster"
                    }
                    alt={item.name}
                    className="search-result-image"
                  />
                  <div className="search-result-info">
                    <h3>{item.name}</h3>
                    <p className="media-type">TV Show</p>
                    <p>Rating: {item.vote_average}</p>
                    <p>First Air: {item.first_air_date}</p>
                    <Cast tvId={item.id} mediaType="tv" />{" "}
                    {/* Fixed: use tvId instead of movieId */}
                    <p className="overview">{item.overview}</p>
                  </div>
                </div>
              )}

              {/* Person Result */}
              {item.media_type === "person" && (
                <div className="person-result">
                  <img
                    src={
                      item.profile_path
                        ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
                        : "https://via.placeholder.com/300x450/333/fff?text=No+Photo"
                    }
                    alt={item.name}
                    className="search-result-image" // CHANGED: Use different class
                  />
                  <div className="search-result-info">
                    {" "}
                    {/* CHANGED: Use different class */}
                    <h3>{item.name}</h3>
                    <p className="media-type">Person</p>
                    <p>Known for: {item.known_for_department}</p>
                    <div className="known-for">
                      {item.known_for?.map((work) => (
                        <span key={work.id} className="known-work">
                          {work.title || work.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {data && filteredResults && filteredResults.length === 0 && (
        <div className="no-results">No results found for "{searchQuery}"</div>
      )}
    </div>
  );
}

export default MultiSearch;
