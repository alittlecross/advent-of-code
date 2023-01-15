const fs = require('fs');

const input = Object.fromEntries(fs.readFileSync('algorithm/16/input.txt', 'utf-8').split('\n')
  .map((e) => e.match(/^Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)$/).slice(1, 4))
  .map((e) => [e[0], { valve: e[0], rate: +e[1], valves: e[2].split(', ') }]));

const getShortest = (obj, valve, steps = 0) => {
  if (obj[valve] < steps) {
    return;
  }

  obj[valve] = steps;

  input[valve].valves.forEach((_value) => {
    getShortest(obj, _value, steps + 1);
  });
};

const getTimes = (valve) => {
  const obj = {};

  if (!input[valve].times) {
    getShortest(obj, valve);

    input[valve].times = obj;
  }

  return input[valve].times;
};

const pathFinder = (time) => {
  const paths = [{
    valve: 'AA',
    valves: Object.values(input).filter((e) => e.rate).map((e) => e.valve),
    steps: [],
    time,
    flow: 0,
  }];

  for (const path of paths) {
    if (path.time) {
      const times = getTimes(path.valve);

      path.done = true;

      for (const valve of path.valves) {
        if (path.time - times[valve] > 0) {
          path.done = false;

          paths.push({
            valve,
            valves: path.valves.filter((e) => e !== valve),
            steps: [...path.steps, valve],
            time: (path.time - times[valve] - 1),
            flow: (path.time - times[valve] - 1) * input[valve].rate + path.flow,
          });
        }
      }
    }
  }

  return paths.filter((e) => e.done).sort((a, b) => b.flow - a.flow);
};

module.exports = {
  pathFinder,
};
