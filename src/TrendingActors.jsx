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
          {data &&
            data.results &&
            data.results.map((actor) => (
              <div
                key={actor.id}
                className="trending-actors"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/h632/${actor.profile_path})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  // height: "200px",
                  // width: "200px",
                  // borderRadius: "50%",
                  border: "3px solid #ffd700",
                  position: "relative", // Added for content positioning
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
