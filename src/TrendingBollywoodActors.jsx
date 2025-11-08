import { useState, useEffect } from "react";

function TrendingBollywoodActors() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using discover with known Bollywood actor IDs or search for Indian actors
    fetch(
      "https://api.themoviedb.org/3/search/person?api_key=3e34829ad355424421b39a1a3162baa0&query=Indian&language=en-US&page=1"
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
  console.log("From Trending Bollywood Actors:", data);

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        Loading Bollywood actors...
      </div>
    );
  }

  if (!data || !data.results) {
    return (
      <div style={{ color: "white", textAlign: "center" }}>
        No Bollywood actors data available
      </div>
    );
  }

  // Filter to ensure we only show actors with profile images
  const actorsWithImages = data.results.filter((actor) => actor.profile_path);

  return (
    <>
      <div className="parent-actor-container">
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#ffd700",
          }}
        >
          Trending Bollywood Actors
        </h1>
        <div className="actors-div">
          {actorsWithImages.map((actor) => (
            <div
              key={actor.id}
              className="trending-actors"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w300${actor.profile_path})`,
                backgroundSize: "cover",
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

export default TrendingBollywoodActors;
