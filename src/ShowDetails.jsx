import Cast from "./Cast";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ShowDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, mediaType } = useParams(); // Get params from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if id is not null
    if (!id) {
      return;
    }

    setLoading(true);

    // Determine the correct endpoint based on mediaType from URL
    let apiUrl = "";
    if (mediaType === "tv") {
      apiUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=3e34829ad355424421b39a1a3162baa0`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=3e34829ad355424421b39a1a3162baa0`;
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
  }, [id, mediaType]);

  console.log("From ShowDetails:", data);

  if (loading) {
    return <div style={{ color: "white" }}>Loading details...</div>;
  }

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "0.5rem 1rem",
          background: "#ffd700",
          color: "#1a1a1a",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        ← Back
      </button>

      {data && (
        <>
          <div className="content-name">
            <h1 style={{ color: "#ffd700", marginBottom: "1rem" }}>
              {data.title || data.name}
            </h1>
          </div>
          <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
            {data.overview}
          </p>
          <Cast
            movieId={mediaType === "movie" ? id : null}
            tvId={mediaType === "tv" ? id : null}
            mediaType={mediaType}
          />
        </>
      )}
    </div>
  );
}

export default ShowDetails;
