const apiKey = '7a47f7c1221e45aa9a85e81c98bbb23f';
const apiUrl = 'https://api.themoviedb.org/3';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchMethodBtn = document.getElementById('searchMethod');
const discoverMethodBtn = document.getElementById('discoverMethod');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    searchMoviesAndShows(searchTerm);
  }
});

searchMethodBtn.addEventListener('click', () => {
  searchInput.placeholder = 'Enter keyword';
});

discoverMethodBtn.addEventListener('click', () => {
  searchInput.placeholder = 'Discovering...';
  discoverMoviesAndShows();
});

function searchMoviesAndShows(keyword) {
  const searchUrl = `${apiUrl}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(keyword)}`;
  
  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      showResults(data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function discoverMoviesAndShows() {
  const discoverUrl = `${apiUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

  fetch(discoverUrl)
    .then(response => response.json())
    .then(data => {
      showResults(data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function showResults(results) {
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const item = document.createElement('div');
    item.classList.add('movie-item');
    item.innerHTML = `<h3>${result.title || result.name}</h3>
                      <p>Release Date: ${result.release_date || result.first_air_date}</p>
                      <p>${result.overview}</p>`;

    resultsContainer.appendChild(item);
  });
}
