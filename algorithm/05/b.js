const { getInputArray, getInputInstructions } = require('./index');

const move = () => {
  const array = getInputArray();
  const instructions = getInputInstructions();

  for (let i = 0; i < instructions.length; i++) {
    array[+instructions[i][5] - 1].push(...array[+instructions[i][3] - 1].splice(array[+instructions[i][3] - 1].length - +instructions[i][1]));
  }

  return array.map((e) => e.pop()).join('');
};

console.log(move());
