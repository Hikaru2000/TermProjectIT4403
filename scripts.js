const API_KEY = '7a47f7c1221e45aa9a85e81c98bbb23f';
const BASE_URL = 'https://api.themoviedb.org/3';
const SEARCH_URL = `${BASE_URL}/search/movie`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieList = document.getElementById('movieList');

searchBtn.addEventListener('click', searchMovies);

async function searchMovies() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') return;

  try {
    const response = await fetch(`${SEARCH_URL}?api_key=${API_KEY}&query=${searchTerm}`);
    const data = await response.json();

    if (data.results) {
      displayMovies(data.results);
    } else {
      movieList.innerHTML = 'No movies found.';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    movieList.innerHTML = 'An error occurred while fetching data.';
  }
}

function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    movieList.appendChild(movieCard);
  });
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

  movieCard.appendChild(poster);
  movieCard.appendChild(title);
  movieCard.appendChild(releaseDate);
  movieCard.appendChild(overview);

  return movieCard;
}
