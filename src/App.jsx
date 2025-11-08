import { useState, useEffect } from "react";
import Popularmovies from "./Popularmovies";
import Trendingmovies from "./Trendingmovies";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import ShowDetails from "./ShowDetails";
import MultiSearch from "./Multisearch";

function App() {
  const [showsidebar, setShowsidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [isSearchOn, setIsSearchOn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [multisearchvisibility, setMultisearchVisibility] = useState(false);

  // Remove selectedItem state since we'll use URL params

  const navigate = useNavigate();

  const sendDetailsToShowDetails = (id, mediaType = "movie") => {
    console.log("ID:", id, "Type:", mediaType);
    // Navigate to details page instead of setting state
    navigate(`/details/${mediaType}/${id}`);
  };

  const handlesearchclose = () => {
    setIsSearchOn(true);
    setMultisearchVisibility(false);
  };

  const handleSearch = () => {
    setIsSearchOn(false);
    setMultisearchVisibility(true);
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }

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

  return (
    <>
      <div>
        <div className="nav">
          <Link to="/" style={{ textDecoration: "none" }}>
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

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                {multisearchvisibility && (
                  <MultiSearch
                    data={data}
                    handlesearchclose={handlesearchclose}
                    sendDetailsToShowDetails={sendDetailsToShowDetails}
                  />
                )}

                {isSearchOn && (
                  <Popularmovies
                    sendDetailsToShowDetails={sendDetailsToShowDetails}
                  />
                )}
                {isSearchOn && (
                  <Trendingmovies
                    sendDetailsToShowDetails={sendDetailsToShowDetails}
                  />
                )}
              </>
            }
          />

          {/* Details Route */}
          <Route path="/details/:mediaType/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </>
  );
}

// Wrap App with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
