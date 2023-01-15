const { getInput } = require('./index');

const lose = (a) => {
  switch (a) {
    case 'B':
      return 'A';
    case 'C':
      return 'B';
    default:
      return 'C';
  }
};

const win = (a) => {
  switch (a) {
    case 'A':
      return 'B';
    case 'B':
      return 'C';
    default:
      return 'A';
  }
};

const replace = (a, b) => {
  switch (b) {
    case 'X':
      return lose(a);
    case 'Y':
      return a;
    default:
      return win(a);
  }
};

console.log(getInput(replace));
