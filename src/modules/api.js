import axios from 'axios';
import { showsUrl } from './urls.js';

export const getShows = async () => {
  const response = await axios.get(showsUrl);
  const shows = response.data;
  return shows.splice(59, 12);
};

export const getLikes = async () => {};
