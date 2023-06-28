const countHomeShows = () => {
  const showsContainer = document.querySelector('main');
  const cards = [...showsContainer.querySelectorAll('.card')];
  return cards.length;
};

export default countHomeShows;
