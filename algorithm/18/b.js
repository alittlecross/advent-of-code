const {
  add, compareFaces, getDroplet, getFaces,
} = require('./index');

const outside = () => {
  const droplet = getDroplet();

  const lengths = [
    droplet.length + 1,
    Math.max(...droplet.map((e) => e.length).flat()) + 1,
    Math.max(...droplet.map((e) => e.map((ee) => ee.length)).flat()) + 1,
  ];

  const checked = [];
  const queue = [[0, 0, 0]];

  const cb = (face, x, y, z) => {
    const neighbour = droplet[x]?.[y]?.[z];

    if (neighbour) {
      add(true, checked, x, y, z);
      neighbour[5 - face] = 2;
    } else if ([x, y, z].every((e, i) => e > -1 && e < lengths[i])) {
      queue.push([x, y, z]);
    }
  };

  while (queue.length) {
    const [x, y, z] = queue.shift();

    if (!checked[x]?.[y]?.[z]) {
      add(true, checked, x, y, z);
      compareFaces(cb, x, y, z);
    }
  }

  getFaces(droplet, 2);
};

outside();
