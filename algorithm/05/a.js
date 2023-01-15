const { getInputArray, getInputInstructions } = require('./index');

const move = () => {
  const array = getInputArray();
  const instructions = getInputInstructions();

  for (let i = 0; i < instructions.length; i++) {
    for (let j = 0; j < +instructions[i][1]; j++) {
      array[+instructions[i][5] - 1].push(array[+instructions[i][3] - 1].pop());
    }
  }

  return array.map((e) => e.pop()).join('');
};

console.log(move());
