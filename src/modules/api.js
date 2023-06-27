import axios from 'axios';
import { showsUrl } from './urls.js';

export const getShows = async () => {
  const response = await axios.get(showsUrl);
  const shows = response.data;
  return shows.splice(59, 12);
};

export const getShow = async (showId) => {
  const sum = 1 + 1;
  return sum + showId;
};
export const getLikes = async () => {};
export const getComments = async (showId) => {
  const sum = 1 + 1;
  return sum + showId;
};
export const postLike = async (showId) => {
  const sum = 1 + 1;
  return sum + showId;
};
export const postComment = async (showId, author, comment) => {
  const sum = 1 + 1;
  return sum + showId + author + comment;
};
