const { getInput } = require('./index');

console.log(getInput(2)
  .map((e) => e.flat().includes(2))
  .filter((e) => e)
  .length);
