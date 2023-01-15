const fs = require('fs');

const getInput = () => fs.readFileSync('algorithm/07/input.txt', 'utf8')
  .split('\n')
  .map((e) => e.split(' '));

const tally = (path, tot, value) => {
  if (tot[path.join()] === undefined) {
    tot[path.join()] = 0;
  }

  if (value !== 'dir') {
    tot[path.join()] += +value;
  }

  if (path.length > 1) {
    tally(path.slice(0, -1), tot, value);
  }
};

const update = (key, obj, path, value) => {
  if (path[0]) {
    if (obj[path[0]] === undefined) {
      obj[path[0]] = {};
    }
  }

  if (path.length > 1) {
    update(key, obj[path[0]], path.slice(1), value);
  } else {
    obj[path[0]][key] = value === 'dir' ? {} : +value;
  }
};

const map = () => {
  const input = getInput();
  const obj = {};
  const path = [];
  const tot = {};

  input.forEach((e) => {
    if (e[0] === '$') {
      if (e[1] === 'cd') {
        if (e[2] === '..') {
          path.pop();
        } else {
          path.push(e[2]);
        }
      }
    } else {
      tally([...path], tot, e[0]);
      update(e[1], obj, [...path], e[0]);
    }
  });

  return tot;
};

module.exports = {
  map,
};
