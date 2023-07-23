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

// Add more API functions based on your needs
