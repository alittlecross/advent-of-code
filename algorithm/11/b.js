const { keepAway } = require('./index');

console.log(keepAway(1, 10000)
  .map((e) => e.tally)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, c) => a * c));
