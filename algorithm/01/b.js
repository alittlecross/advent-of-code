const { getInput } = require('./index');

console.log(getInput()
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((a, c) => a + c));
