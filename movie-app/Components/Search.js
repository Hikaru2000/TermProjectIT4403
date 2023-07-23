// components/Search.js
import React, { useState } from "react";
import { searchMovies } from "../services/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div>
        {/* Display search results in multiple views */}
        {searchResults.map((movie) => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

