const { keepAway } = require('./index');

console.log(keepAway(3, 20)
  .map((e) => e.tally)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, c) => a * c));
