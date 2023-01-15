const { checkLine } = require('./index');

const checkLines = () => {
  for (let i = 0; i <= 4000000; i++) {
    const ranges = checkLine(i);

    if (ranges.length > 1) {
      return ((ranges[0][1] + 1) * 4000000) + i;
    }
  }

  return null;
};

console.log(checkLines());
