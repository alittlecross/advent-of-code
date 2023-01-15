const fs = require('fs');

const getInput = (length) => {
  const input = fs.createReadStream('algorithm/06/input.txt', {
    encoding: 'utf8',
  });

  input.on('readable', () => {
    const array = [];

    let index = 0;
    let letter = input.read(1);

    while (letter !== null) {
      if (array.length >= length) {
        array.shift();
      }

      array.push(letter);
      index++;
      letter = input.read(1);

      const distinct = [...new Set(array)];

      if (distinct.length === length) {
        console.log(index);
        input.destroy();
        break;
      }
    }
  });
};

module.exports = {
  getInput,
};
