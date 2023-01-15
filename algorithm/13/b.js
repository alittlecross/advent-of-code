const { compare, getInput } = require('./index');

const sort = () => {
  const A = [[2]];
  const B = [[6]];

  return [...getInput().flat(), A, B]
    .sort((a, b) => (compare(a, b) ? -1 : 1))
    .map((e, i) => (e === A || e === B ? i + 1 : 1))
    .reduce((a, c) => a * c);
};

console.log(sort());
