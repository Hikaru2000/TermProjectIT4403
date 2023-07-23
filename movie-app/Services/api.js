// services/api.js
import axios from "axios";

const API_KEY = "7a47f7c1221e45aa9a85e81c98bbb23f";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovies = async () => {
  const response = await api.get("/movie/popular");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get("/search/movie", {
    params: {
      query,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const getPersonDetails = async (personId) => {
  const response = await api.get(`/person/${personId}`);
  return response.data;
};

// Add more API functions based on your needs
