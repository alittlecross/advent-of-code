const fs = require('fs');

const getInput = () => fs.readFileSync('algorithm/01/input.txt', 'utf8')
  .split('\n\n')
  .map((e) => e.split('\n').map((ee) => +ee).reduce((a, c) => a + c));

module.exports = {
  getInput,
};
