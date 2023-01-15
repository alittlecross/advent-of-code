const fs = require('fs');

const outcome = (a, b) => {
  switch (true) {
    case a === 'A' && b === 'B':
    case a === 'B' && b === 'C':
    case a === 'C' && b === 'A':
      return 6;
    case a === b:
      return 3;
    default:
      return 0;
  }
};

const shape = (a) => {
  switch (a) {
    case 'A':
      return 1;
    case 'B':
      return 2;
    case 'C':
      return 3;
    default:
      return 0;
  }
};

const getInput = (replace) => fs.readFileSync('algorithm/02/input.txt', 'utf8')
  .split('\n')
  .map((e) => {
    const a = e.split(' ');

    a[1] = replace(...a);

    return shape(a[1]) + outcome(a[0], a[1]);
  })
  .reduce((a, c) => a + c);

module.exports = {
  getInput,
};
