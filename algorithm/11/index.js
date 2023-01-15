const fs = require('fs');

const getInput = () => fs.readFileSync('algorithm/11/input.txt', 'utf8')
  .split('\n\n')
  .map((e) => e.split('\n').map((ee) => ee.split(': ')))
  .map((e, i) => ({
    monkey: i,
    items: e[1][1].split(', ').map((ee) => +ee),
    operation: e[2][1].split(' ').slice(3),
    modulo: +e[3][1].split(' ').reverse()[0],
    true: +e[4][1].split(' ').reverse()[0],
    false: +e[5][1].split(' ').reverse()[0],
    tally: 0,
  }));

const keepAway = (div, rounds) => {
  const input = getInput();
  const modulo = input.map((e) => e.modulo).reduce((a, c) => a * c);

  for (let i = 0; i < rounds; i++) {
    input.forEach((e) => {
      while (e.items.length) {
        const ee = e.items.shift();

        e.tally++;

        const _old = e.operation[1] === 'old'
          ? ee
          : +e.operation[1];

        let _new = e.operation[0] === '*'
          ? ee * _old
          : ee + _old;

        _new = Math.floor(_new / div);
        _new %= modulo;

        input[_new % e.modulo ? e.false : e.true].items.push(_new);
      }
    });
  }

  return input;
};

module.exports = {
  keepAway,
};
