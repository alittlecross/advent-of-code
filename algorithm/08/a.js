const { look } = require('./index');

const pass = (input, clone) => {
  for (let h = 0; h < input.length; h++) {
    for (let v = 0; v < input[h].length; v++) {
      if (!v
        || input[h].slice(0, v).every((e) => e < input[h][v])
        || input[h].slice(v + 1).every((e) => e < input[h][v])
      ) {
        clone[h][v] = 1;
      }
    }
  }
};

console.log(look(pass, 0)
  .map((e) => e.reduce((a, c) => a + c))
  .reduce((a, c) => a + c));
