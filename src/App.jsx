import { useState } from "react";
import Popularmovies from "./Popularmovies";
import Trendingmovies from "./Trendingmovies";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ShowDetails from "./ShowDetails";
import MultiSearch from "./Multisearch";
import TrendingActors from "./TrendingActors";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [multisearchvisibility, setMultisearchVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const sendDetailsToShowDetails = (id, mediaType = "movie") => {
    navigate(`/details/${mediaType}/${id}`);
  };

  const handlesearchclose = () => {
    setMultisearchVisibility(false);
    setSearchQuery("");
    navigate("/");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }

    setMultisearchVisibility(true);
    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=3e34829ad355424421b39a1a3162baa0&query=${encodeURIComponent(
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

  const handleHomeRedirect = () => {
    setMultisearchVisibility(false);
    setSearchQuery("");
    navigate("/");
  };

  // Check if we're on details page
  const isDetailsPage = location.pathname.startsWith("/details");

  return (
    <div>
      {/* Navigation */}
      <div className="nav">
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={handleHomeRedirect}
        >
          <h1>iMovies</h1>
        </Link>
        <div className="searchdiv">
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
        </div>
      </div>

      {/* Show home content UNLESS we're on details page */}
      {!isDetailsPage && (
        <>
          {multisearchvisibility ? (
            <MultiSearch
              data={data}
              handlesearchclose={handlesearchclose}
              sendDetailsToShowDetails={sendDetailsToShowDetails}
            />
          ) : (
            <>
              <Popularmovies
                sendDetailsToShowDetails={sendDetailsToShowDetails}
              />
              <Trendingmovies
                sendDetailsToShowDetails={sendDetailsToShowDetails}
              />
              <TrendingActors />
            </>
          )}
        </>
      )}

      {/* Routes - Only for ShowDetails */}
      <Routes>
        <Route path="/details/:mediaType/:id" element={<ShowDetails />} />
      </Routes>
    </div>
  );
}

export default App;
