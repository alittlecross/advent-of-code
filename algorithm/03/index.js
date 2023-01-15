const fs = require('fs');

const compare = (arr) => arr
  .map((e) => {
    const a = e[0].split('');

    for (let i = 0; i < a.length; i++) {
      if (e[1].includes(a[i])) {
        if (e[2]) {
          if (e[2].includes(a[i])) {
            return a[i];
          }
        } else {
          return a[i];
        }
      }
    }

    return undefined;
  })
  .map((e) => {
    const charCode = e.charCodeAt(0);

    return charCode - 96 > 0 ? charCode - 96 : charCode - 38;
  })
  .reduce((a, c) => a + c);

const getInput = () => fs.readFileSync('algorithm/03/input.txt', 'utf8')
  .split('\n');

module.exports = {
  compare,
  getInput,
};
