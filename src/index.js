import * as api from './modules/api.js';
import * as view from './modules/view.js';
import './style.css';

const mainSection = document.querySelector('main');
const modal = document.querySelector('.modal');
let addCommentForm;

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
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  const shows = await api.getShowsAndLikes();
  view.renderShows(shows);
});
