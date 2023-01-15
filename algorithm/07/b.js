const { map } = require('./index');

const space = () => {
  const values = Object
    .values(map())
    .sort((a, b) => b - a);

  return values
    .filter((e) => e > 30000000 - (70000000 - values[0]))
    .sort((a, b) => a - b)[0];
};

console.log(space());
