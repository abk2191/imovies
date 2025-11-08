import { useState, useEffect } from "react";
import Cast from "./Cast";

function Trendingmovies({ sendDetailsToShowDetails }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=3e34829ad355424421b39a1a3162baa0"
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
  }, []);
  console.log(data);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  return (
    <>
      <div className="main-container">
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#a8a821",
          }}
        >
          Trending Movies
        </h1>
        <div className="movie-container">
          {data.results.map((movies) => (
            <div
              key={movies.id}
              className="movie-description"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "400px",
                width: "250px",
                borderRadius: "10px",
                position: "relative", // Added for content positioning
              }}
              onClick={() => sendDetailsToShowDetails(movies.id)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Trendingmovies;
