const { getChamber, map } = require('./index');

const simulation = () => {
  const chamber = getChamber({}, 2022);

  map(chamber).reverse().forEach((e) => console.log(e));

  console.log(chamber.length - 1);
};

simulation();
