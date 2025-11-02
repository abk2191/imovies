import { useState, useEffect } from "react";

function Searchforamovie() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a movie name");
      return;
    }

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=3e34829ad355424421b39a1a3162baa0&query=${encodeURIComponent(
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
      <div className="main-container">
        <div className="search-div">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter movie name..."
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#a8a821",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {data && data.results && data.results.length > 0 && (
          <div className="movie-container">
            {data.results.map((movie) => (
              <div key={movie.id} className="movie-description">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  style={{
                    height: "250px",
                    width: "250px",
                    borderRadius: "5px",
                  }}
                  alt={movie.title}
                />
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.6",
                    color: "white",
                  }}
                >
                  {movie.title}
                </h2>
                <hr />
                <div className="language-and-release-div">
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "1.6",
                      color: "white",
                    }}
                  >
                    Rating: {movie.vote_average}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "1.6",
                      color: "white",
                    }}
                  >
                    Language: {movie.original_language}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "1.6",
                      color: "white",
                    }}
                  >
                    Release Date: {movie.release_date}
                  </p>
                </div>
                <hr />
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.6",
                    color: "white",
                  }}
                >
                  {movie.overview}
                </p>
              </div>
            ))}
          </div>
        )}

        {data && data.results && data.results.length === 0 && (
          <div style={{ color: "white", textAlign: "center" }}>
            No movies found for "{searchQuery}"
          </div>
        )}
      </div>
    </>
  );
}

export default Searchforamovie;
