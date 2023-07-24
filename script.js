//API Key to access Movie API
const apiKey = '7a47f7c1221e45aa9a85e81c98bbb23f';
const apiUrl = 'https://api.themoviedb.org/3';

//Results per page for pagination
const resultsPerPage = 10; // Number of results per page

// Pagination elements
let currentPage = 1;
let currentSearchTerm = '';
let currentMethod = 'search';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchMethodBtn = document.getElementById('searchMethod');
const discoverMethodBtn = document.getElementById('discoverMethod');
const resultsContainer = document.getElementById('results');

//Search button Event - Starts and returns search
searchBtn.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    currentMethod = 'search';
    currentSearchTerm = searchTerm;
    currentPage = 1;
    searchMoviesAndShows(currentSearchTerm, currentPage);
  }
});

//Search Method Button Event - Goes back to search actions
searchMethodBtn.addEventListener('click', () => {
  searchInput.placeholder = 'Enter keyword';
  currentMethod = 'search';
  currentPage = 1;
  searchMoviesAndShows(currentSearchTerm, currentPage);
});

//Discovery Method Button Event - Goes to discovery mode of popular movies
discoverMethodBtn.addEventListener('click', () => {
  searchInput.placeholder = 'Discovering...';
  currentMethod = 'discover';
  currentPage = 1;
  discoverMoviesAndShows(currentPage);
});

//Search Function
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

//Discovery Function - shows popular movies and shows
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

//Displays results and constructs card
function showResults(results, totalPages) {
  resultsContainer.innerHTML = '';

  results.forEach(result => {
    const item = document.createElement('div');
    item.classList.add('movie-item');
    item.setAttribute('data-id', result.id);

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


// Add event listener to show detailed info when clicking on a movie/TV show
resultsContainer.addEventListener('click', (event) => {
  const movieItem = event.target.closest('.movie-item');
  console.log('movieItem:', movieItem);
  console.log('movieItem.dataset:', movieItem.dataset);
  
  if (movieItem) {
    const id = movieItem.getAttribute('data-id');
    console.log('Clicked Movie/TV Show ID:', id);
    showDetailedInfo(id);
  }
});

function showDetailedInfo(id) {
  console.log('Movie/TV Show ID:', id);
  const detailsUrl = `${apiUrl}/movie/${id}?api_key=${apiKey}&append_to_response=credits,reviews`;

  fetch(detailsUrl)
    .then(response => response.json())
    .then(data => {
      showDetailedModal(data);
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
    });
}

function showDetailedModal(movieData) {
  // Create a modal to display detailed information
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>${movieData.title}</h2>
      <p>Release Date: ${movieData.release_date}</p>
      <p>Overview: ${movieData.overview}</p>
      
      <h3>Cast</h3>
      <ul class="cast-list">
        ${getCastList(movieData.credits.cast)}
      </ul>

      <h3>Reviews</h3>
      <ul class="reviews-list">
        ${getReviewsList(movieData.reviews.results)}
      </ul>
    </div>
  `;

  document.body.appendChild(modal);

  // Close the modal when clicking on the close button
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

function getCastList(cast) {
  return cast
    .slice(0, 5) // Display the first 5 cast members
    .map(member => `<li class="cast-member" data-person-id="${cast.id}">${member.name} as ${member.character}</li>`)
    .join('');
}

function getReviewsList(reviews) {
  return reviews
    .slice(0, 5) // Display the first 5 reviews
    .map(review => `<li>${review.author}: ${review.content}</li>`)
    .join('');
}


//Show Cast Details

// Add event listener to show detailed info when clicking on a cast member
function handleCastMemberClick(event) {
  const castMember = event.target.closest('.cast-member');
  if (castMember) {
    const personId = castMember.dataset.personId;
    showPersonDetails(personId);
    console.log('Person ID:', personId);
  }
}

resultsContainer.addEventListener('click', handleCastMemberClick);

function showPersonDetails(personId) {
  const personDetailsUrl = `${apiUrl}/person/${personId}?api_key=${apiKey}`;

  fetch(personDetailsUrl)
    .then(response => response.json())
    .then(data => {
      showPersonDetailsModal(data);
    })
    .catch(error => {
      console.error('Error fetching person details:', error);
    });
}

function showPersonDetailsModal(personData) {
  // Create a modal to display detailed information about the person
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>${personData.name}</h2>
      <p>Gender: ${personData.gender === 1 ? 'Female' : 'Male'}</p>
      <p>Birthday: ${personData.birthday || 'N/A'}</p>
      <p>Place of Birth: ${personData.place_of_birth || 'N/A'}</p>
      <p>Biography: ${personData.biography || 'N/A'}</p>
    </div>
  `;

  document.body.appendChild(modal);

  // Close the modal when clicking on the close button
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

