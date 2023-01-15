const { compare, getInput } = require('./index');

const match = () => {
  const indices = [];

  getInput().forEach((e, i) => {
    if (compare(...e)) {
      indices.push(i + 1);
    }
  });

  return indices.reduce((a, c) => a + c);
};

console.log(match());
