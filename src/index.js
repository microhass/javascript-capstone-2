import * as api from './modules/api.js';
import renderShows from './modules/view.js';
import './style.css';

window.addEventListener('DOMContentLoaded', async () => {
  const shows = await api.getShows();
  renderShows(shows);
});
