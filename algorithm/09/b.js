const { track } = require('./index');

console.log(track(10)
  .flat()
  .filter((e) => e === '#')
  .length);
