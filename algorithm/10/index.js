const fs = require('fs');

const getInput = () => fs.readFileSync('algorithm/10/input.txt', 'utf8')
  .split('\n')
  .map((e) => e.split(' '));

const trace = () => {
  const input = getInput();
  const record = [];

  let a = 1;
  let b = 1;

  input.forEach((e) => {
    if (e[0] === 'noop') {
      record.push([a, b]);
    } else {
      record.push([a, b]);
      b += +e[1];
      record.push([a, b]);
      a += +e[1];
    }
  });

  return record;
};

module.exports = {
  trace,
};
