import { useState, useEffect } from "react";
import Cast from "./Cast";

function Popularmovies() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=3e34829ad355424421b39a1a3162baa0"
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
          Popular Movies
        </h1>
        <div className="movie-container">
          {data.results.map((movies) => (
            <div key={movies.id} className="movie-description">
              <img
                src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                style={{
                  height: "250px",
                  width: "250px",
                  borderRadius: "5px",
                }}
                alt=""
              />
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  lineHeight: "1.6",
                  color: "white",
                }}
              >
                {movies.title}
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
                  Rating: {movies.vote_average}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.6",
                    color: "white",
                  }}
                >
                  Language: {movies.original_language}
                </p>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1.6",
                    color: "white",
                  }}
                >
                  Release Date: {movies.release_date}
                </p>
              </div>
              <Cast movieId={movies.id} />
              <hr />

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  lineHeight: "1.6",
                  color: "white",
                }}
              >
                {movies.overview}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Popularmovies;
