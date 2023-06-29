import countComments from '../src/modules/commentsCounter.js';

describe('App can render tasks', () => {
  test('Should count homepage items', () => {
    document.body.innerHTML =
      '<ul class="comments">' +
      '  <li class="comment"><li>' +
      '  <li class="comment"><li>' +
      '  <li class="comment"><li>' +
      '  <li class="comment"><li>' +
      '</ul>';

    const commentsCount = countComments();
    expect(commentsCount).toBe(4);
  });
});
