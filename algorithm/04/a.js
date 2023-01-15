const { getInput } = require('./index');

console.log(getInput(0)
  .map((e) => (e[0].reduce((a, c) => a + c) === 0 || e[1].reduce((a, c) => a + c) === 0 ? 1 : 0))
  .reduce((a, c) => a + c));
