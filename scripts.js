const API_KEY = '7a47f7c1221e45aa9a85e81c98bbb23f';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = `${BASE_URL}/search/movie`;
const TOP_MOVIES_URL = `${BASE_URL}/movie/popular`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieList = document.getElementById('movieList');


// Load the saved movie lists from local storage on page load
document.addEventListener('DOMContentLoaded', async () => {
  loadMovieLists();
  await displayPopularMovies();
});

function loadMovieLists() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const watchList = JSON.parse(localStorage.getItem('watchList')) || [];

  displayMovies(favorites, 'Favorites', 'favorites');
  displayMovies(watchList, 'Watch List', 'watchList');
}

async function displayPopularMovies() {
  try {
    const response = await fetch(`${TOP_MOVIES_URL}?api_key=${API_KEY}`);
    const data = await response.json();

    if (data.results) {
      const popularMoviesSection = document.createElement('section');
      popularMoviesSection.classList.add('movie-section');

      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = 'Popular Movies';

      const popularMoviesContainer = document.createElement('div');
      popularMoviesContainer.classList.add('movie-cards-container');

      data.results.forEach(movie => {
        const movieCard = createMovieCard(movie, 'popular');
        popularMoviesContainer.appendChild(movieCard);
      });

      popularMoviesSection.appendChild(sectionTitle);
      popularMoviesSection.appendChild(popularMoviesContainer);
      movieList.appendChild(popularMoviesSection);
    } else {
      console.error('Error fetching popular movies data:', data.status_message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error fetching popular movies data:', error);
  }
}
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

function displayMovies(movies, title, listName) {
  const movieSection = document.createElement('section');
  movieSection.classList.add('movie-section');

  const sectionTitle = document.createElement('h2');
  sectionTitle.textContent = title;

  const movieCardsContainer = document.createElement('div');
  movieCardsContainer.classList.add('movie-cards-container');

  movies.forEach(movie => {
    const movieCard = createMovieCard(movie, listName);
    movieCardsContainer.appendChild(movieCard);
  });

  movieSection.appendChild(sectionTitle);
  movieSection.appendChild(movieCardsContainer);
  movieList.appendChild(movieSection);
}

function createMovieCard(movie, listName) {
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

  // Create button to remove movie from the list
  const removeFromListBtn = document.createElement('button');
  removeFromListBtn.textContent = 'Remove from List';
  removeFromListBtn.addEventListener('click', () => removeFromList(movie, listName));

  movieCard.appendChild(poster);
  movieCard.appendChild(title);
  movieCard.appendChild(releaseDate);
  movieCard.appendChild(overview);

  if (listName === 'favorites' || listName === 'watchList') {
    movieCard.appendChild(removeFromListBtn);
  } else {
    movieCard.appendChild(addToFavoritesBtn);
    movieCard.appendChild(addToWatchListBtn);
  }

  return movieCard;
}

function addToFavorites(movie) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(movie);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadMovieLists();
}

function addToWatchList(movie) {
  const watchList = JSON.parse(localStorage.getItem('watchList')) || [];
  watchList.push(movie);
  localStorage.setItem('watchList', JSON.stringify(watchList));
  loadMovieLists();
}

function removeFromList(movie, listName) {
  let list = JSON.parse(localStorage.getItem(listName)) || [];
  list = list.filter(item => item.id !== movie.id);
  localStorage.setItem(listName, JSON.stringify(list));
  loadMovieLists();
}

// Clear all favorite and watch list movies
const clearFavoritesBtn = document.getElementById('clearFavorites');
const clearWatchListBtn = document.getElementById('clearWatchList');

clearFavoritesBtn.addEventListener('click', () => {
  localStorage.removeItem('favorites');
  loadMovieLists();
});

clearWatchListBtn.addEventListener('click', () => {
  localStorage.removeItem('watchList');
  loadMovieLists();
});


