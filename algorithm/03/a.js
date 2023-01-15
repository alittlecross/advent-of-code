const { compare, getInput } = require('./index');

console.log(compare(getInput()
  .map((e) => [e.slice(0, e.length / 2), e.slice(-e.length / 2)])));
