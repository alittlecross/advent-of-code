const { trace } = require('./index');

const tally = () => {
  const record = trace();

  let total = 0;

  for (let i = 20; i < 221; i += 40) {
    total += record[i - 1][0] * i;
  }

  return total;
};

console.log(tally());
