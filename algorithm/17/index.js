const fs = require('fs');

const addRock = (chamber, xnys) => {
  xnys.forEach((e) => {
    chamber[e[0]] = chamber[e[0]] ?? [];
    chamber[e[0]][e[1]] = '#';
  });
};

const rocks = [
  (e) => [[e + 0, 2], [e + 0, 3], [e + 0, 4], [e + 0, 5]],
  (e) => [[e + 0, 3], [e + 1, 2], [e + 1, 3], [e + 1, 4], [e + 2, 3]],
  (e) => [[e + 0, 2], [e + 0, 3], [e + 0, 4], [e + 1, 4], [e + 2, 4]],
  (e) => [[e + 0, 2], [e + 1, 2], [e + 2, 2], [e + 3, 2]],
  (e) => [[e + 0, 2], [e + 0, 3], [e + 1, 2], [e + 1, 3]],
];

const getInput = () => fs.readFileSync('algorithm/17/input.txt', 'utf-8')
  .split('');

const getRock = (max) => {
  const rock = rocks[0](max + 4);

  rocks.push(rocks.shift());

  return rock;
};

const getWind = (input) => {
  const wind = input[0] === '<' ? -1 : 1;

  input.push(input.shift());

  return wind;
};

const getChamber = (obj, limit) => {
  const chamber = [];
  const input = getInput();

  let max = 0;

  addRock(chamber, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]]);

  for (let i = 0; i < (limit || 5 * input.length); i++) {
    let falling = true;
    let rock = getRock(max);

    while (falling) {
      const wind = getWind(input);

      if (rock.every((e) => e[1] + wind > -1 && e[1] + wind < 7 && !chamber[e[0]]?.[e[1] + wind])) {
        rock = rock.map((e) => [e[0], e[1] + wind]);
      }

      if (rock.some((e) => chamber[e[0] - 1]?.[e[1]])) {
        addRock(chamber, rock);

        falling = false;
        max = chamber.length - 1;
        obj[max] = i + 1;
      } else {
        rock = rock.map((e) => [e[0] - 1, e[1]]);
      }
    }
  }

  return chamber;
};

const map = (chamber) => chamber.map((e, _i) => {
  for (let i = 0; i < 7; i++) {
    if (_i) {
      if (!e[i]) {
        e[i] = '.';
      }
    } else {
      e[i] = '-';
    }
  }

  return `${_i ? '|' : '+'}${e.join('')}${_i ? '|' : '+'}`;
});

module.exports = {
  getChamber,
  map,
};
