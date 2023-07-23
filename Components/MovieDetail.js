// components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../services/api";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(id);
      setMovieDetails(details);
    };

    const fetchMovieCredits = async () => {
      const credits = await getMovieCredits(id);
      setCast(credits.cast);
    };

    fetchMovieDetails();
    fetchMovieCredits();
  }, [id]);

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt={movieDetails.title} />
      <p>{movieDetails.overview}</p>

      <h3>Cast:</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img src={`https://image.tmdb.org/t/p/w100${actor.profile_path}`} alt={actor.name} />
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;

