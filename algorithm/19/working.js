const fs = require('fs');

const blueprints = fs.readFileSync('algorithm/19/input.txt', 'utf-8')
  .split('\n')
  .map((e) => e.replace(/\D+/g, ' ').split(' ').slice(2, 8))
  .map((e) => ({
    ore: { ore: e[0] },
    clay: { ore: e[1] },
    obsidian: { ore: e[2], clay: e[3] },
    geode: { ore: e[4], obsidian: e[5] },
  }));

const advancePool = (obj, mins = 1) => {
  ['ore', 'clay', 'obsidian', 'geode'].forEach((e) => {
    obj[e] += obj[`${e}R`] * mins;
  });
};

const buildBot = (b, obj, type) => {
  Object.entries(b[type]).forEach((e) => {
    obj[e[0]] -= e[1];
  });
};

const quality = (b, time) => {
  const queue = [{
    oreR: 1, clayR: 0, obsidianR: 0, geodeR: 0, ore: 0, clay: 0, obsidian: 0, geode: 0, time,
  }];

  let maxResult = 0;
  let earliestGeode = 0;

  const splitPathIfPossible = (q, type, minRemainingT) => {
    const obj = { ...q };

    // if (!entries.every((e) => q[`${c.type}R`] > 0)) {
    //   return 0;
    // }

    const t = Math.max(0, ...Object.entries(b[type]).map((e) => Math.ceil((e[1] - q[e[0]]) / q[`${e[0]}R`])));

    if (q.time - t >= minRemainingT) {
      obj.time -= (t + 1);

      advancePool(obj, t + 1);
      buildBot(b, obj, type);

      obj[`${type}R`]++;

      return queue.push(obj);
    }
    return 0;
  };

  while (queue.length) {
    const q = queue.pop();

    if (q.geode > 0 && q.time > earliestGeode) {
      earliestGeode = q.time;
    }

    if (q.time < earliestGeode && q.geode === 0) {
      continue;
    }

    if (q.time <= 0) {
      maxResult = Math.max(maxResult, q.geode);
      continue;
    }

    let splitPaths = 0;

    splitPaths += splitPathIfPossible(q, 'geode', 1);
    splitPaths += splitPathIfPossible(q, 'obsidian', 4);

    if (q.clayR < b.obsidian.clay - 1) {
      splitPaths += splitPathIfPossible(q, 'clay', 7);
    }

    if (q.oreR < 4) {
      splitPaths += splitPathIfPossible(q, 'ore', 16);
    }

    if (!splitPaths) {
      const obj = { ...q };

      advancePool(obj, q.time);
      obj.time = 0;

      queue.push(obj);
    }
  }

  return maxResult;
};

const part1 = () => blueprints.reduce((accumulator, currentValue, currentIndex) => accumulator + quality(currentValue, 24) * (currentIndex + 1), 0);
const part2 = () => blueprints.slice(0, 3).reduce((accumulator, currentValue) => accumulator * quality(currentValue, 32), 1);

console.log('part1', part1());
console.log('part2', part2());
