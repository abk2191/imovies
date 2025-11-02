import { useState, useEffect } from "react";

function Cast({ movieId, tvId, mediaType }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Determine which endpoint to use
    let apiUrl = "";
    if (mediaType === "tv" && tvId) {
      apiUrl = `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=3e34829ad355424421b39a1a3162baa0`;
    } else if (mediaType === "movie" && movieId) {
      apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3e34829ad355424421b39a1a3162baa0`;
    } else {
      setLoading(false);
      setError("No valid ID provided");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.cast) {
          const castWithImages = data.cast
            .filter((person) => person.profile_path)
            .slice(0, 6);
          setCast(castWithImages);
        } else {
          setCast([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cast:", error);
        setError("Failed to load cast");
        setLoading(false);
      });
  }, [movieId, tvId, mediaType]); // tvId is now properly defined

  if (loading) return <div style={{ color: "white" }}>Loading cast...</div>;
  if (error) return <div style={{ color: "white" }}>{error}</div>;
  if (!cast || cast.length === 0)
    return <div style={{ color: "white" }}>No cast information available</div>;

  return (
    <div className="cast-container">
      <h3 style={{ color: "#ffd700", marginBottom: "10px" }}>Top Cast</h3>
      <div className="cast-grid">
        {cast.map((person) => (
          <div key={person.id} className="cast-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
              alt={person.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0 auto 0.5rem",
                border: "2px solid #ffd700",
              }}
            />
            <div className="cast-info">
              <p className="cast-name">{person.name}</p>
              <p className="cast-character">as {person.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cast;
