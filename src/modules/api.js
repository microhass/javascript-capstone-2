import axios from 'axios';
import { showsUrl, likesUrl } from './urls.js';

const getShows = async () => {
  const response = await axios.get(showsUrl);
  const shows = response.data;
  return shows.splice(59, 12);
};

const getLikes = async () => {
  const likes = await axios.get(likesUrl);
  return likes.data;
};

const getShowsAndLikes = async () => {
  const shows = await getShows();
  const likes = await getLikes();

  shows.forEach((show) => {
    show.likes = likes.filter((like) => like.item_id === show.id)[0].likes;
  });

  return shows;
};

export default getShowsAndLikes;
