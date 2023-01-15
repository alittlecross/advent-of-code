const fs = require('fs');

const draw = (occupied) => {
  const map = [];

  for (let y = 0; y < occupied.length; y++) {
    map[y] = map[y] ?? [];

    for (let x = 0; x < 500 + occupied.length; x++) {
      map[y][x - (500 - occupied.length) - 1] = occupied[y]?.[x] || '.';
    }
  }

  map.map((e) => console.log(e.join('')));
};

const getInput = () => fs.readFileSync('algorithm/14/input.txt', 'utf8')
  .split('\n')
  .map((e) => e
    .split(' -> ')
    .map((ee) => ee
      .split(',')
      .map((eee) => +eee)));

const limits = (a, b) => ({
  min: Math.min(a, b),
  max: Math.max(a, b),
});

const getWalls = (bool) => {
  const walls = [];

  getInput().forEach((e) => {
    while (e.length > 1) {
      const a = e.shift();
      const b = e[0];

      if (a[0] === b[0]) {
        const { min, max } = limits(a[1], b[1]);

        for (let i = min; i <= max; i++) {
          walls[i] = walls[i] ?? [];
          walls[i][a[0]] = '#';
        }
      } else {
        const { min, max } = limits(a[0], b[0]);

        for (let i = min; i <= max; i++) {
          walls[a[1]] = walls[a[1]] ?? [];
          walls[a[1]][i] = '#';
        }
      }
    }
  });

  walls[0] = walls[0] ?? [];
  walls[0][500] = '+';

  if (bool) {
    const floor = walls.length + 1;

    walls[floor] = walls[floor] ?? [];

    for (let i = 500 - floor; i <= 500 + floor; i++) {
      walls[floor][i] = '#';
    }
  }

  return walls;
};

const sandfall = (bool) => {
  const occupied = getWalls(bool);

  let x = 500;
  let y = 0;
  let z = true;

  while (z) {
    if (!occupied[y + 1]?.[x]) {
      y++;
    } else {
      x -= 1;

      if (!occupied[y + 1]?.[x]) {
        y++;
      } else {
        x += 2;

        if (!occupied[y + 1]?.[x]) {
          y++;
        } else {
          x -= 1;

          occupied[y] = occupied[y] ?? [];
          occupied[y][x] = 'o';

          if (x === 500 && y === 0) {
            z = false;
          } else {
            x = 500;
            y = 0;
          }
        }
      }
    }

    if (y > occupied.length) {
      z = false;
    }
  }

  draw(occupied);

  return occupied
    .map((e) => e.filter((ee) => ee === 'o').length)
    .reduce((a, c) => a + c);
};

module.exports = {
  sandfall,
};
