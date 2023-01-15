const { getInput } = require('./index');

const replace = (a, b) => {
  switch (b) {
    case 'X':
      return 'A';
    case 'Y':
      return 'B';
    default:
      return 'C';
  }
};

console.log(getInput(replace));
