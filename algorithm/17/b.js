const { getChamber, map } = require('./index');

const patternFinder = () => {
  const rocks = {};
  const sample = map(getChamber(rocks)).join('').slice(9);

  let first;
  let second;

  for (let i = sample.length / 2; i < sample.length; i += 9) {
    const a = sample.substring(0, i);
    const b = sample.substring(i);

    first = a.indexOf(b);

    if (first > 0) {
      second = sample.indexOf(b, first + 1);

      break;
    }
  }

  first /= 9;
  second /= 9;

  const base = rocks[first];
  const cycle = rocks[second] - base;
  const dividend = 1000000000000 - base;
  const modulo = dividend % cycle;

  const chamber = getChamber({}, modulo + base);
  const cycles = (dividend - modulo) / cycle;
  const cyclesHeight = cycles * (second - first) + chamber.length - 1;

  console.log(cyclesHeight);
};

patternFinder();
