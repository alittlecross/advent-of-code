const { look } = require('./index');

const pass = (input, clone) => {
  for (let h = 0; h < input.length; h++) {
    for (let v = 0; v < input[h].length; v++) {
      let l = 0;
      let r = 0;

      for (let nl = v - 1; nl >= 0; nl--) {
        l++;

        if (input[h][v] <= input[h][nl]) {
          break;
        }
      }

      for (let nr = v + 1; nr < input[h].length; nr++) {
        r++;

        if (input[h][v] <= input[h][nr]) {
          break;
        }
      }

      clone[h][v].push(l, r);
    }
  }
};

console.log(Math.max(...look(pass, 1)
  .map((e) => e.map((ee) => ee.reduce((a, c) => a * c)))
  .flat()));
