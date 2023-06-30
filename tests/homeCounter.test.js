import countHomeShows from '../src/modules/homeCounter.js';

describe('Homepage counter functionality', () => {
  test('Should return 0 if there are no shows', () => {
    document.body.innerHTML = '<main></main>';

    const showCount = countHomeShows();
    expect(showCount).toBe(0);
  });

  test('Should count homepage items', () => {
    document.body.innerHTML = '<main>'
      + '  <div class="card"><div>'
      + '  <div class="card"><div>'
      + '  <div class="card"><div>'
      + '</main>';

    const showCount = countHomeShows();
    expect(showCount).toBe(3);
  });
});
