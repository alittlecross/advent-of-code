const { track } = require('./index');

console.log(track(2)
  .flat()
  .filter((e) => e === '#')
  .length);
