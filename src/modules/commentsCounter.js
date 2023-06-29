const countComments = () => {
  const comments = [...document.querySelectorAll('.comment')];
  return comments.length;
};

export default countComments;
