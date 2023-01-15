const fs = require('fs');

const getBoard = (input) => {
  const directions = {
    L: 0,
    R: 0,
    U: 0,
    D: 0,
  };

  input.forEach((e) => {
    directions[e[0]] += +e[1];
  });

  const x = Math.max(directions.L, directions.R);
  const y = Math.max(directions.U, directions.D);

  const shape = new Array((y * 2) + 1).fill(new Array((x * 2) + 1).fill('.'));

  return {
    board: shape.map((e) => e.map((ee) => ee)),
    start: {
      x,
      y,
    },
  };
};

const getInput = () => fs.readFileSync('algorithm/09/input.txt', 'utf8')
  .split('\n')
  .map((e) => e.split(' '));

const track = (knots) => {
  const input = getInput();

  const { board, start } = getBoard(input);

  const x = new Array(knots).fill(start.x);
  const y = new Array(knots).fill(start.y);

  const move = (e, direction, axis, int) => {
    if (e[0] === direction) {
      for (let i = 0; i < +e[1]; i++) {
        if (axis === 'x') {
          x[0] += int;
        } else {
          y[0] += int;
        }

        for (let c = 0; c < knots; c++) {
          const n = c + 1;

          if (x[c] - x[n] > 1) {
            x[n]++;
            y[n] = y[c];
          }

          if (x[n] - x[c] > 1) {
            x[n]--;
            y[n] = y[c];
          }

          if (y[c] - y[n] > 1) {
            x[n] = x[c];
            y[n]++;
          }

          if (y[n] - y[c] > 1) {
            x[n] = x[c];
            y[n]--;
          }
        }

        board[y[knots - 1]][x[knots - 1]] = '#';
      }
    }
  };

  input.forEach((e) => {
    move(e, 'L', 'x', -1);
    move(e, 'R', 'x', 1);
    move(e, 'U', 'y', -1);
    move(e, 'D', 'y', 1);
  });

  return board;
};

module.exports = {
  track,
};
