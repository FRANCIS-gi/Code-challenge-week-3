function fetchFilms() {
  fetch('https://api.npoint.io/0b2aef194151f5771a43/films/')
    .then(response => response.json())
    .then(data => renderFilms(data))
    .catch(error => console.log('Error:', error));
}

function renderFilms(data) {
  const cardDiv = document.getElementById('card');
  const filmsUl = document.getElementById('films');

  data.forEach(movie => {
    const li = document.createElement('li');
    li.classList.add('pointer', 'bold-italic-text');
    li.innerHTML = movie.title;

    const filmCard = document.createElement('div');
    filmCard.classList.add('film-card');
    filmCard.innerHTML = `
      <img src="${movie.poster}" height="500" width="300">
      <h2 class="bold-text">${movie.title}</h2>
      <p class="bold-text">${movie.description}</p>
      <p><span class="highlight bold-text">Runtime: ${movie.runtime}</span></p>
      <p><span class="highlight bold-text">Showtime: ${movie.showtime}</span></p>
      <p class="bold-italic-text">Available tickets: ${movie.capacity - movie.tickets_sold}</p>
      <button class="buy-ticket-btn">Buy ticket</button>
    `;

    const buyTicketBtn = filmCard.querySelector('.buy-ticket-btn');
    buyTicketBtn.addEventListener('click', () => {
      const ticketsP = filmCard.querySelector('.bold-italic-text');
      const availableTickets = parseInt(ticketsP.textContent.split(': ')[1]);
      if (availableTickets === 0) {
        alert('Ticket Sold Out');
      } else {
        ticketsP.textContent = `Available tickets: ${availableTickets - 1}`;
      }
    });

    li.addEventListener('click', () => {
      if (!filmCard.classList.contains('active')) {
        const activeFilmCard = filmsUl.querySelector('.active');
        if (activeFilmCard) {
          activeFilmCard.classList.remove('active');
        }
        filmCard.classList.add('active');
        cardDiv.innerHTML = '';
        cardDiv.appendChild(filmCard);
      }
    });

    filmsUl.appendChild(li);
  });
}

fetchFilms();
