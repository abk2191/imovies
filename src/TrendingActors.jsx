import { useState, useEffect } from "react";

function TrendingActors() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/trending/person/week?api_key=3e34829ad355424421b39a1a3162baa0"
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
  console.log("From Trending Actors:", data);

  // ADD THESE LOADING AND ERROR CHECKS
  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        Loading actors...
      </div>
    );
  }

  if (!data || !data.results) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        No actors data available
      </div>
    );
  }

  return (
    <>
      <div className="parent-actor-container">
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#ffd700",
          }}
        >
          Trending Actors
        </h1>
        <div className="actors-div">
          {data.results.map((actor) => (
            <div
              key={actor.id}
              className="trending-actors"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/h632/${actor.profile_path})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "3px solid #ffd700",
                position: "relative",
              }}
            >
              {/* <p style={{ color: "white" }}>{actor.name}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrendingActors;
