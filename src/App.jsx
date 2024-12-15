import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  console.log(result);

  const searchWikipedia = async () => {
    if (!query) return;

    try {
      const response = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          format: "json",
          list: "search",
          srsearch: query, // Search term
          srlimit: 10, // Limit to 10 results
          origin: "*", // Required for CORS
        },
      });
      const searchResults = response.data.query.search;

      setResult(searchResults || "No results found.");
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Error fetching data. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Wikipedia Viewer</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Wikipedia"
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={searchWikipedia} style={{ marginLeft: "10px" }}>
        Search
      </button>
      <div style={{ marginTop: "20px" }}>
        {result && result.length > 0 ? (
          <ul>
            {result.map((item) => (
              <li>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>Type a query and click "Search".</p>
        )}
      </div>
    </div>
  );
};

export default App;
