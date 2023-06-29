import countHomeShows from '../src/modules/homeCounter.js';

describe('App can render tasks', () => {
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
