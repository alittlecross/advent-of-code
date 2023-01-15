const fs = require('fs');

const input = fs.readFileSync('algorithm/18/input.txt', 'utf-8')
  .split('\n')
  .map((e) => e.split(',').map((ee) => ++ee));

const add = (e, arr, x, y, z) => {
  arr[x] = arr[x] ?? [];
  arr[x][y] = arr[x][y] ?? [];
  arr[x][y][z] = e;
};

const compareFaces = (cb, x, y, z, cube) => {
  cb(0, x - 1, y, z, cube);
  cb(5, x + 1, y, z, cube);
  cb(1, x, y - 1, z, cube);
  cb(4, x, y + 1, z, cube);
  cb(2, x, y, z - 1, cube);
  cb(3, x, y, z + 1, cube);
};

const getDroplet = () => {
  const droplet = [];

  const cb = (face, x, y, z, cube) => {
    const neighbour = droplet[x]?.[y]?.[z];

    if (neighbour) {
      cube[face] = 0;
      neighbour[5 - face] = 0;
    }
  };

  input.forEach((e) => {
    const [x, y, z] = e;

    const cube = { ...new Array(6).fill(1) };

    compareFaces(cb, x, y, z, cube);

    add(cube, droplet, x, y, z);
  });

  return droplet;
};

const getFaces = (droplet, int) => {
  console.log(droplet.flat(2).map(((e) => Object.values(e))).flat().filter((e) => e === int).length);
};

module.exports = {
  add,
  compareFaces,
  getDroplet,
  getFaces,
};
