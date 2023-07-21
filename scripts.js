const API_KEY = '7a47f7c1221e45aa9a85e81c98bbb23f';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = `${BASE_URL}/search/movie`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieList = document.getElementById('movieList');

// Load the saved movie lists from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const watchList = JSON.parse(localStorage.getItem('watchList')) || [];
  
  // Call the displayMovies function to show the saved movies
  displayMovies(favorites, 'Favorites');
  displayMovies(watchList, 'Watch List');
});

searchBtn.addEventListener('click', searchMovies);

async function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') return;

  try {
    const response = await fetch(`${SEARCH_URL}?api_key=${API_KEY}&query=${searchTerm}`);
    const data = await response.json();

    if (data.results) {
      displayMovies(data.results, 'Search Results');
    } else {
      movieList.innerHTML = 'No movies found.';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    movieList.innerHTML = 'An error occurred while fetching data.';
  }
}

function displayMovies(movies, title) {
  const movieSection = document.createElement('section');
  movieSection.classList.add('movie-section');

  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = title;

  const movieCardsContainer = document.createElement('div');
  movieCardsContainer.classList.add('movie-cards-container');

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    movieCardsContainer.appendChild(movieCard);
  });

  movieSection.appendChild(sectionTitle);
  movieSection.appendChild(movieCardsContainer);
  movieList.appendChild(movieSection);
}

function createMovieCard(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');

  const title = document.createElement('h2');
  title.textContent = movie.title;

  const releaseDate = document.createElement('p');
  releaseDate.textContent = `Release Date: ${movie.release_date}`;

  const overview = document.createElement('p');
  overview.textContent = movie.overview;

  const poster = document.createElement('img');
  poster.src = `${IMAGE_BASE_URL}/${movie.poster_path}`;
  poster.alt = movie.title;

  // Create buttons to add to favorite and watch list
  const addToFavoritesBtn = document.createElement('button');
  addToFavoritesBtn.textContent = 'Add to Favorites';
  addToFavoritesBtn.addEventListener('click', () => addToFavorites(movie));

  const addToWatchListBtn = document.createElement('button');
  addToWatchListBtn.textContent = 'Add to Watch List';
  addToWatchListBtn.addEventListener('click', () => addToWatchList(movie));

  movieCard.appendChild(poster);
  movieCard.appendChild(title);
  movieCard.appendChild(releaseDate);
  movieCard.appendChild(overview);
  movieCard.appendChild(addToFavoritesBtn);
  movieCard.appendChild(addToWatchListBtn);

  return movieCard;
}

function addToFavorites(movie) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToWatchList(movie) {
  const watchList = JSON.parse(localStorage.getItem('watchList')) || [];
  watchList.push(movie);
  localStorage.setItem('watchList', JSON.stringify(watchList));
}
