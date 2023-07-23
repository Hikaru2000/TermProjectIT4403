// components/Home.js
import React, { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const movies = await getPopularMovies();
      setPopularMovies(movies);
    };
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <div>
        {/* Display popular movies in a gallery format */}
        {popularMovies.map((movie) => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

