import * as api from './modules/api.js';
import * as view from './modules/view.js';
import './style.css';

const mainSection = document.querySelector('main');
const modal = document.querySelector('.modal');
let addCommentForm;
let shows = [];

const commentSubmitHandler = async (e) => {
  e.preventDefault();
  const showId = modal.querySelector('.popup').id;
  const inputAuthor = document.querySelector('#author');
  const inputComment = document.querySelector('#insight');

  if (inputAuthor.trim() === '' || inputComment.trim() === '') return;

  await api.postComment(showId, inputAuthor, inputComment);
};

const addModalListeners = () => {
  addCommentForm = modal.querySelector('form');
  addCommentForm.addEventListener('submit', commentSubmitHandler);
};

mainSection.addEventListener('click', async (e) => {
  const targetId = e.target.id;
  const showId = e.target.closest('.card').id;
  if (targetId === 'comments') {
    await view.showModal(showId);
    addModalListeners();
  } else if (targetId === 'like-img') {
    await api.postLike(showId);
    shows = await api.getShowsAndLikes();
    const prevLikes = shows.find((show) => show.id === +showId).likes;
    const newLikes = `${+prevLikes} likes`;
    e.target.previousElementSibling.textContent = newLikes;
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  shows = await api.getShowsAndLikes();
  view.renderShows(shows);
});
