const fs = require('fs');

const getInput = (replacement) => fs.readFileSync('algorithm/04/input.txt', 'utf8')
  .split('\n')
  .map((e) => e.split(',')
    .map((ee) => {
      const l = ee.split('-');

      return Array(+l[1]).fill(0).fill(1, +l[0] - 1);
    }))
  .map((e) => {
    const m = Math.max(e[0].length, e[1].length);

    for (let i = 0; i < m; i++) {
      if (e[0][i] === 1 && e[1][i] === 1) {
        e[0][i] = replacement;
        e[1][i] = replacement;
      }
    }

    return e;
  });

module.exports = {
  getInput,
};
