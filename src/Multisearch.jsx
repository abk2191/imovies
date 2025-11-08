// MultiSearch.jsx
import { useState, useEffect } from "react";
import Cast from "./Cast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function MultiSearch({ data, handlesearchclose, sendDetailsToShowDetails }) {
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
                <div
                  className="movie-result"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w300${item.poster_path})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "400px",
                    width: "250px",
                    borderRadius: "10px",
                    position: "relative", // Added for content positioning
                  }}
                  onClick={() => sendDetailsToShowDetails(item.id, "movie")}
                >
                  {/* <img
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                        : "https://via.placeholder.com/300x450/333/fff?text=No+Poster"
                    }
                    alt={item.title}
                    className="search-result-image"
                  /> */}
                </div>
              )}
              {/* TV Show Result */}
              {item.media_type === "tv" && (
                <div
                  className="tv-result"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w300${item.poster_path})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "400px",
                    width: "250px",
                    borderRadius: "10px",
                    position: "relative", // Added for content positioning
                  }}
                  onClick={() => sendDetailsToShowDetails(item.id, "tv")}
                ></div>
              )}

              {/* Person Result */}
              {item.media_type === "person" && (
                <div
                  className="person-result"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w300${item.profile_path})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "400px",
                    width: "250px",
                    borderRadius: "10px",
                    position: "relative", // Added for content positioning
                  }}
                  onClick={() => sendDetailsToShowDetails(item.id, "movie")}
                ></div>
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
