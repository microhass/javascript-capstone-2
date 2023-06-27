import getShowsAndLikes from './modules/api.js';
import renderShows from './modules/view.js';
import './style.css';

window.addEventListener('DOMContentLoaded', async () => {
  const shows = await getShowsAndLikes();
  renderShows(shows);
});
