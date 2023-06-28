import * as api from './modules/api.js';
import * as view from './modules/view.js';
import './style.css';

const getComments = async (showId) => {
  const comments = await api.getComments(showId);
  return comments;
};

const renderComments = (comments) => {
  const commentsDiv = document.querySelector('#comments');
  commentsDiv.innerHTML = '';
  const commentElements = comments.map((comment) => {
    const commentElement = document.createElement('div');
    const profilePicture = document.createElement('img');
    profilePicture.src = comment.author.profilePictureUrl;
    commentElement.innerHTML = `
      <strong>
        <img src="${profilePicture.src}" alt="${comment.author.username}" />
        ${comment.author.username}
      </strong>: ${comment.insight}
    `;
    return commentElement;
  });
  commentsDiv.appendChild(...commentElements);
};

const commentCounter = () => {
  const commentsDiv = document.querySelector('#comments');
  const comments = commentsDiv.querySelectorAll('div');
  return comments.length;
};

const addCommentForm = document.querySelector('.modal form');
const mainSection = document.querySelector('main');

const commentSubmitHandler = async (e) => {
  e.preventDefault();
  const showId = document.querySelector('.modal').id;
  const inputAuthor = document.querySelector('#author');
  const inputComment = document.querySelector('#insight');

  if (inputAuthor.trim() === '' || inputComment.trim() === '') return;

  const commentData = {
    author: inputAuthor.value,
    insight: inputComment.value,
  };

  await api.postComment(showId, commentData);

  // Reload the comments to show the new comment.
  const comments = await getComments();
  renderComments(comments);

  // Clear the comment form.
  inputAuthor.value = '';
  inputComment.value = '';

  // Update the comment counter.
  const commentCount = commentCounter();
  const commentCountElement = document.querySelector('#comment-count');
  commentCountElement.innerHTML = `${commentCount}`;
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

  // Set the initial comment count.
  const commentCount = commentCounter();
  const commentCountElement = document.querySelector('#comment-count');
  commentCountElement.innerHTML = `${commentCount}`;
});
