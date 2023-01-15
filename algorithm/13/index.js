const fs = require('fs');

const getInput = () => fs.readFileSync('algorithm/13/input.txt', 'utf8')
  .split('\n\n')
  .map((e) => e.split('\n').map((ee) => JSON.parse(ee)));

const compare = (l, r) => {
  for (let i = 0; i < l.length; i++) {
    if (r[i] === undefined) {
      return false;
    }

    if (Array.isArray(l[i]) || Array.isArray(r[i])) {
      const outcome = compare(
        Array.isArray(l[i]) ? l[i] : [l[i]],
        Array.isArray(r[i]) ? r[i] : [r[i]],
      );

      if (outcome !== undefined) {
        return outcome;
      }
    } else {
      if (l[i] < r[i]) {
        return true;
      }

      if (l[i] > r[i]) {
        return false;
      }
    }
  }

  if (l.length < r.length) {
    return true;
  }

  return undefined;
};

module.exports = {
  compare,
  getInput,
};
