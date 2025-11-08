import Cast from "./Cast";
import { useState, useEffect } from "react";

function ShowDetails({ movieId, mediaType = "movie" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch if movieId is not null
    if (!movieId) {
      return;
    }

    setLoading(true);

    // Determine the correct endpoint based on mediaType
    let apiUrl = "";
    if (mediaType === "tv") {
      apiUrl = `https://api.themoviedb.org/3/tv/${movieId}?api_key=3e34829ad355424421b39a1a3162baa0`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=3e34829ad355424421b39a1a3162baa0`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsondata) => {
        setData(jsondata);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [movieId, mediaType]);

  console.log("From ShowDetails:", data);

  if (!movieId) {
    return null;
  }

  if (loading) {
    return <div style={{ color: "white" }}>Loading details...</div>;
  }

  return (
    <>
      <h2>{movieId}</h2>
      {data && (
        <>
          <h2>{data.title || data.name}</h2>
          <p>{data.overview}</p>
          <Cast
            movieId={mediaType === "movie" ? movieId : null}
            tvId={mediaType === "tv" ? movieId : null}
            mediaType={mediaType}
          />
        </>
      )}
    </>
  );
}

export default ShowDetails;
