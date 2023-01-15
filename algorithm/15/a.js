const { checkLine } = require('./index');

console.log(checkLine(2000000)
  .reduce((a, c) => a + c[1] - c[0], 0));
