const fs = require('fs');

const getInput = fs.readFileSync('algorithm/15/input.txt', 'utf8')
  .split('\n')
  .map((e) => e.replace('Sensor at x=', '').split(/, y=|: closest beacon is at x=/))
  .sort((a, b) => a[1] - b[1])
  .map((e) => ({
    r: Math.abs(e[0] - e[2]) + Math.abs(e[1] - e[3]),
    s: {
      x: +e[0],
      y: +e[1],
    },
  }));

const getChords = (line) => getInput
  .map(({ r, s }) => {
    const reach = r - Math.abs(line - s.y);

    return reach > 0 && [s.x - reach, s.x + reach];
  })
  .filter((e) => e)
  .sort((a, b) => a[1] - b[1])
  .sort((a, b) => a[0] - b[0]);

const checkLine = (line) => {
  const chords = getChords(line);
  const ranges = [chords[0]];

  for (let i = 1; i < chords.length; i++) {
    if (chords[i][0] > ranges[0][1]) {
      ranges.unshift(chords[i]);
    } else if (chords[i][1] > ranges[0][1]) {
      [, ranges[0][1]] = chords[i];
    }
  }

  return ranges.reverse();
};

module.exports = {
  checkLine,
};
