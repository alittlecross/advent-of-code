const fs = require('fs');

const input = require('./input');

const getInputArray = () => input.map((e) => e.split(''));

const getInputInstructions = () => fs.readFileSync('algorithm/05/input.txt', 'utf8')
  .split('\n')
  .map((e) => e.split(' '));

module.exports = {
  getInputArray,
  getInputInstructions,
};
