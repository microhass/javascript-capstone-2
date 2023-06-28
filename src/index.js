import * as api from './modules/api.js';
import * as view from './modules/view.js';
import './style.css';

const addCommentForm = document.querySelector('.modal form');
const mainSection = document.querySelector('main');

const commentSubmitHandler = async (e) => {
  e.preventDefault();
  const showId = document.querySelector('.modal').id;
  const inputAuthor = document.querySelector('#author');
  const inputComment = document.querySelector('#insight');

  if (inputAuthor.trim() === '' || inputComment.trim() === '') return;

  await api.postComment(showId, inputAuthor, inputComment);
};

mainSection.addEventListener('click', async (e) => {
  const targetId = e.target.id;
  const showId = e.target.closest('.card').id;
  if (targetId === 'comments') {
    await view.renderModal(showId);
  } else if (targetId === 'like-img') {
    await api.postLike(showId);
  }
});

addCommentForm.addEventListener('submit', commentSubmitHandler);

window.addEventListener('DOMContentLoaded', async () => {
  const shows = await api.getShows();
  view.renderShows(shows);
});
const commentsDiv = document.querySelector('#comments');
const showId = document.querySelector('.modal').id;

// Get the item comments from the Involvement API.
const getComments = async () => {
  const comments = await api.getComments(showId);
  return comments;
};

// Render the item comments in the popup.
const renderComments = (comments) => {
  commentsDiv.innerHTML = '';
  const commentElements = comments.map((comment) => {
    const commentElement = document.createElement('div');
    commentElement.innerHTML = `
      <strong>${comment.author}</strong>: ${comment.insight}
    `;
    return commentElement;
  });
  commentsDiv.appendChild(...commentElements);
};

// Load the item comments when the popup loads.
commentsDiv.addEventListener('load', async () => {
  const comments = await getComments();
  renderComments(comments);
});
