const apiKey = '7a47f7c1221e45aa9a85e81c98bbb23f';
const apiUrl = 'https://api.themoviedb.org/3';
const resultsPerPage = 10; // Number of results per page

let currentPage = 1;
let currentSearchTerm = '';
let currentMethod = 'search';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchMethodBtn = document.getElementById('searchMethod');
const discoverMethodBtn = document.getElementById('discoverMethod');
const resultsContainer = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    currentMethod = 'search';
    currentSearchTerm = searchTerm;
    currentPage = 1;
    searchMoviesAndShows(currentSearchTerm, currentPage);
  }
});

searchMethodBtn.addEventListener('click', () => {
  searchInput.placeholder = 'Enter keyword';
  currentMethod = 'search';
  currentPage = 1;
  searchMoviesAndShows(currentSearchTerm, currentPage);
});

discoverMethodBtn.addEventListener('click', () => {
  searchInput.placeholder = 'Discovering...';
  currentMethod = 'discover';
  currentPage = 1;
  discoverMoviesAndShows(currentPage);
});

function searchMoviesAndShows(keyword, page) {
  const searchUrl = `${apiUrl}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(keyword)}&page=${page}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      showResults(data.results, data.total_pages);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function discoverMoviesAndShows(page) {
  const discoverUrl = `${apiUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${page}`;

  fetch(discoverUrl)
    .then(response => response.json())
    .then(data => {
      showResults(data.results, data.total_pages);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function showResults(results, totalPages) {
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const item = document.createElement('div');
    item.classList.add('movie-item');

    const imageUrl = result.poster_path
      ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
      : 'placeholder.jpg'; // Replace with a placeholder image URL or leave blank

    item.innerHTML = `<img src="${imageUrl}" alt="${result.title || result.name}" />
                      <h3>${result.title || result.name}</h3>
                      <p>Release Date: ${result.release_date || result.first_air_date}</p>
                      <p>${result.overview}</p>`;

    resultsContainer.appendChild(item);
  });

  // Pagination
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');

  if (currentPage > 1) {
    const prevBtn = createPaginationButton('Prev', currentPage - 1);
    pagination.appendChild(prevBtn);
  }

  if (currentPage < totalPages) {
    const nextBtn = createPaginationButton('Next', currentPage + 1);
    pagination.appendChild(nextBtn);
  }

  resultsContainer.appendChild(pagination);
}

function createPaginationButton(text, page) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', () => {
    if (currentMethod === 'search') {
      searchMoviesAndShows(currentSearchTerm, page);
    } else {
      discoverMoviesAndShows(page);
    }
    currentPage = page;
  });
  return button;
}
