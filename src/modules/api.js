import axios from 'axios';
import {
  showsUrl, likesUrl, showUrl, commentsUrl,
} from './urls.js';

const getShows = async () => {
  const response = await axios.get(showsUrl);
  const shows = response.data;
  return shows.splice(59, 12);
};

export const getShow = async (showId = 1) => {
  const response = await axios.get(`${showUrl}${showId}`);
  return response.data;
};

export const getLikes = async () => {
  const likes = await axios.get(likesUrl);
  return likes.data;
};

export const postLike = async (showId) => {
  await axios.post(likesUrl, {
    'item-id': showId,
  });
};

export const getComments = async (showId) => {
  const response = await axios.get(`${commentsUrl}?item_id=${showId}`);
  return response.data;
};

export const postComment = async (showId, author, comment) => {
  await axios.post(commentsUrl, {
    item_id: showId,
    username: author,
    comment,
  });
};

export const getShowsAndLikes = async () => {
  const shows = await getShows();
  const likes = await getLikes();

  shows.forEach((show) => {
    show.likes = likes.filter(
      (like) => like.item_id === show.id,
    )[0].likes;
  });

  return shows;
};
