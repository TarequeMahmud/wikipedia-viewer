import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const searchWikipedia = async () => {
    if (!query) return;

    try {
      const response = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          format: "json",
          prop: "extracts",
          exintro: true,
          explaintext: true,
          titles: query,
          origin: "*", // Required for CORS
        },
      });

      const pages = response.data.query.pages;
      const page = Object.values(pages)[0]; // Get the first page result
      setResult(page.extract || "No results found.");
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
        {result ? <p>{result}</p> : <p>Type a query and click "Search".</p>}
      </div>
    </div>
  );
};

export default App;
