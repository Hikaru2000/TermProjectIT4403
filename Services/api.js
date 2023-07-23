// services/api.js
import axios from "axios";

const API_KEY = "YOUR_API_KEY";
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

// Add more API functions based on your needs
