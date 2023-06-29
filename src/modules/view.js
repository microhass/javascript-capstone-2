import * as api from './api.js';
import countHomeShows from './homeCounter.js';
import likeImg from '../../images/like.png';
import closeIcon from '../../images/close.png';

const showsContainer = document.querySelector('main');
const modal = document.querySelector('.modal');
let commentsContainer;

export const renderShows = (shows) => {
  const showsMarkup = shows
    .map(
      (show) => `
        <div class="card" id="${show.id}">
        <div class="movie-img">
          <img src="${show.image.original}" alt="${show.name}" />
        </div>
        <div class="movie-details">
          <div class="name-like">
            <p class="name">${show.name}</p>
            <div class="likes">
              <p class="like">${show.likes} likes</p>
              <img src="${likeImg}" alt="like"
              id="like-img" />
            </div>
          </div>

          <div class="card-actions">
            <button type="button" id="comments">Comments</button>
            <button type="button">Reservations</button>
          </div>
        </div>
      </div>
    `,
    )
    .join('');

  showsContainer.innerHTML = showsMarkup;
};

export const renderComments = async (showId) => {
  const comments = await api.getComments(showId);
  const commentsMarkup = comments
    .map(
      (comment) => `
          <li class="comment">
            <span id="date">${comment.creation_date}</span>
            <span class="author">${comment.username}</span>
            <span class="insight"
              >${comment.comment}</span
            >
        </li>
        `,
    )
    .join('');

  commentsContainer.innerHTML = commentsMarkup;
};

export const showModal = async (showId) => {
  const show = await api.getShow(showId);

  const popupMarkup = `
  <div class="popup" id="${show.id}">
    <div class="close">
      <img src="${closeIcon}" alt="Close popup" />
    </div>
    <section class="show-section">
      <div class="show-img">
        <img src="${show.image.original}" alt="${show.name}" />
      </div>
      <div class="show-details">
        <h2>${show.name}</h2>
        <div>
          <span>Language: ${show.language}</span>
          <span>Rating: ${show.rating.average}</span>
          <span>Network: ${show.network?.name || 'CBS'}</span>
          <span>Genres: ${show.genres.join(', ')}</span>
        </div>
      </div>
    </section>
    <section class="comments-section">
      <h3>Comments <span id="count">(3)</span></h3>
      <ul class="comments">
        
      </ul>
      <h3>Add comment</h3>
      <form>
        <input
          type="text"
          name="author"
          id="author"
          placeholder="Your name"
        />
        <textarea
          name="insight"
          id="insight"
          cols="40"
          rows="10"
          placeholder="Your insights"
        ></textarea>
        <button type="submit" id="submit-comment-btn">Comment</button>
      </form>
    </section>
  </div>
  `;

  modal.classList.remove('hide-modal');
  document.body.style.overflow = 'hidden';
  modal.innerHTML = popupMarkup;
  commentsContainer = document.querySelector('.comments');
  await renderComments(showId);
};

export const hideModal = () => {
  modal.classList.add('hide-modal');
  document.body.style.overflow = 'unset';
};

export const renderShowsCount = () => {
  const count = countHomeShows();
  document.querySelector('#shows-count').innerHTML = `(${count})`;
};

export const clearForm = () => {
  document.querySelector('#author').value = '';
  document.querySelector('#insight').value = '';
};
