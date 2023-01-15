const fs = require('fs');

const getInput = () => fs.readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((e) => e.split('').map((ee) => +ee));

const transpose = (array) => array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

const look = (pass, fill) => {
  let input = getInput();
  let clone = input.map((e) => e.map(() => (fill ? [] : 0)));

  pass(input, clone);

  input = transpose(input);
  clone = transpose(clone);

  pass(input, clone);

  input = transpose(input);
  clone = transpose(clone);

  return clone;
};

module.exports = {
  look,
};
