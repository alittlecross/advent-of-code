const { map } = require('./index');

console.log(Object
  .values(map())
  .filter((e) => e < 100001)
  .sort((a, b) => a - b)
  .reduce((a, c) => a + c));
