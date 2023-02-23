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
  const queue = [{
    valve: 'AA',
    valves: Object.values(input).filter((e) => e.rate).map((e) => e.valve),
    steps: [],
    time,
    flow: 0,
  }];

  for (const q of queue) {
    if (q.time) {
      const times = getTimes(q.valve);

      q.done = true;

      for (const v of q.valves) {
        if (q.time - times[v] > 0) {
          q.done = false;

          queue.push({
            valve: v,
            valves: q.valves.filter((e) => e !== v),
            steps: [...q.steps, v],
            time: (q.time - times[v] - 1),
            flow: (q.time - times[v] - 1) * input[v].rate + q.flow,
          });
        }
      }
    }
  }

  return queue.filter((e) => e.done).sort((a, b) => b.flow - a.flow);
};

module.exports = {
  pathFinder,
};
