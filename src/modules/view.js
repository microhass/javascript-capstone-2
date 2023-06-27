import likeImg from '../../images/like.png';

const showsContainer = document.querySelector('main');

const renderShows = (shows) => {
  const showsMarkup = shows
    .map(
      (show) => `
        <div class="card">
        <div class="movie-img">
          <img src="${show.image.original}" alt="${show.name}" />
        </div>
        <div class="movie-details">
          <div class="name-like">
            <p class="name">${show.name}</p>
            <div class="likes">
              <p class="like">8 likes</p>
              <img src="${likeImg}" alt="like"
              id="like-img" />
            </div>
          </div>

          <div class="card-actions">
            <button type="button">Comments</button>
            <button type="button">Reservations</button>
          </div>
        </div>
      </div>
    `,
    )
    .join('');

  showsContainer.innerHTML = showsMarkup;
};

export default renderShows;