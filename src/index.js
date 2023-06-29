import * as api from './modules/api.js';
import * as view from './modules/view.js';
import './style.css';

const mainSection = document.querySelector('main');
const modal = document.querySelector('.modal');
let addCommentForm;
let closeModalIcon;
let shows = [];

const commentSubmitHandler = async (e) => {
  e.preventDefault();
  const showId = modal.querySelector('.popup').id;
  const inputAuthor = document.querySelector('#author').value;
  const inputComment = document.querySelector('#insight').value;

  if (inputAuthor.trim() === '' || inputComment.trim() === '') return;

  await api.postComment(showId, inputAuthor, inputComment);
  await view.renderComments(showId);
  view.clearForm();
};

modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) view.hideModal();
});

const addModalListeners = () => {
  closeModalIcon = document.querySelector('.close');
  addCommentForm = modal.querySelector('form');
  closeModalIcon.addEventListener('click', view.hideModal);
  addCommentForm.addEventListener('submit', commentSubmitHandler);
};

mainSection.addEventListener('click', async (e) => {
  const targetId = e.target.id;
  const showId = e.target.closest('.card').id;
  if (targetId === 'comments') {
    await view.showModal(showId);
    view.renderCommentsCount()
    modal.classList.remove('hide-modal');
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
  view.renderShowsCount();
});
