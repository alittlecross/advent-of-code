const fs = require('fs');

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getInput = () => fs.readFileSync('algorithm/12/input.txt', 'utf8')
  .split('\n')
  .map((e) => e.split(''));

const getMap = (regex) => {
  const input = getInput();
  const queue = [];

  let end;

  const map = input.map((e, y) => e.map((ee, x) => {
    if (ee.match(regex)) {
      queue.push({ y, x, visited: [[y, x]] });
      return 0;
    }

    if (ee === 'E') {
      end = [y, x];
      return 25;
    }

    return ee.codePointAt(0) - 97;
  }));

  return { end, map, queue };
};

const getArrow = (e, _e, i) => {
  switch (true) {
    case !_e:
    case !i:
      return '●';
    case e[0] === _e[0] && e[1] < _e[1]:
      return '▶';
    case e[0] === _e[0] && e[1] > _e[1]:
      return '◀';
    case e[1] === _e[1] && e[0] < _e[0]:
      return '▼';
    case e[1] === _e[1] && e[0] > _e[0]:
      return '▲';
    default:
      return '!';
  }
};

const draw = (route) => {
  const input = getInput();

  route.forEach((e, i, a) => {
    input[e[0]][e[1]] = getArrow(e, a[i + 1], i);
  });

  console.log(input.map((e) => e.join('')));
};

const pathFinder = (regex) => {
  const { end, map, queue } = getMap(regex);

  const checked = [];

  let route;

  while (queue.length) {
    const { y, x, visited } = queue.shift();

    if (y === end[0] && x === end[1]) {
      route = visited;
      break;
    }

    if (!checked[y]?.[x]) {
      for (const moves of directions) {
        const _y = y + moves[0];
        const _x = x + moves[1];

        const alreadyChecked = checked[_y]?.[_x];
        const offTheMap = map[_y]?.[_x] === undefined;
        const tooHigh = map[_y]?.[_x] > map[y][x] + 1;

        if (alreadyChecked || offTheMap || tooHigh) {
          continue;
        }

        queue.push({
          y: _y,
          x: _x,
          visited: [...visited, [_y, _x]],
        });
      }

      checked[y] = checked[y] ?? [];
      checked[y][x] = true;
    }
  }

  draw(route);

  return route.length - 1;
};

module.exports = {
  pathFinder,
};
