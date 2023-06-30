import countComments from '../src/modules/commentsCounter.js';

describe('Homepage counter functionality', () => {
  test('Should return 0 if there are no comments', () => {
    document.body.innerHTML = '<ul class="comments"></ul>';

    const commentsCount = countComments();
    expect(commentsCount).toBe(0);
  });

  test('Should count show comments correctly', () => {
    document.body.innerHTML = '<ul class="comments">'
      + '  <li class="comment"><li>'
      + '  <li class="comment"><li>'
      + '  <li class="comment"><li>'
      + '  <li class="comment"><li>'
      + '</ul>';

    const commentsCount = countComments();
    expect(commentsCount).toBe(4);
  });
});
