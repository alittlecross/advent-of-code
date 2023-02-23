const fs = require('fs');

const getInput = fs.readFileSync('algorithm/19/input.txt', 'utf-8');

const types = {
  ORE: 0,
  CLAY: 1,
  OBSIDIAN: 2,
  GEODE: 3,
};

const getBlueprints = (input) => input.split('\n').map((line) => {
  const tmp = line.match(/\d+/g).map(Number);
  return [[{
    type: types.ORE,
    amount: tmp[1],
  }], [{
    type: types.ORE,
    amount: tmp[2],
  }], [{
    type: types.ORE,
    amount: tmp[3],
  }, {
    type: types.CLAY,
    amount: tmp[4],
  }], [{
    type: types.ORE,
    amount: tmp[5],
  }, {
    type: types.OBSIDIAN,
    amount: tmp[6],
  }]];
});

const run = (bp, timeLeft) => {
  const getBotCost = (botType, costType) => bp[botType].filter((c) => c.type === costType)[0].amount;
  // const canBuildBot = (type, resourcePool) => bp[type].every((c) => resourcePool[c.type] > 0);
  const buildBot = (type, resourcePool) => {
    const rp = resourcePool.slice();
    bp[type].forEach((c) => {
      rp[c.type] -= c.amount;
    });
    return rp;
  };

  const advancePool = (resourcePool, bots, mins = 1) => {
    const rp = resourcePool.slice();
    bots.forEach((bs, type) => {
      rp[type] += bs * mins;
    });
    return rp;
  };

  const addBot = (type, bots) => {
    bots[type]++;
    return bots;
  };

  const paths = [{ bots: [1, 0, 0, 0], timeLeft, resourcePool: [0, 0, 0, 0] }];

  const splitPathIfPossible = (path, botType, minRemainingT) => {
    // if (!canBuildBot(botType, path.bots)) return 0;

    const t = Math.max(0, ...bp[botType].map((c) => Math.ceil((c.amount - path.resourcePool[c.type]) / path.bots[c.type])));

    if (path.timeLeft - t >= minRemainingT) {
      const newTimeleft = path.timeLeft - t - 1;
      const bots = addBot(botType, path.bots.slice());
      const resourcePool = buildBot(botType, advancePool(path.resourcePool, path.bots, t + 1));

      return paths.push({
        timeLeft: newTimeleft,
        bots,
        resourcePool,
      });
    }
    return 0;
  };

  let maxResult = 0; let
    earliestGeode = 0;

  while (paths.length) {
    const path = paths.pop();

    if (path.resourcePool[types.GEODE] > 0 && path.timeLeft > earliestGeode) earliestGeode = path.timeLeft;
    if (path.timeLeft < earliestGeode && path.resourcePool[types.GEODE] === 0) continue;

    if (path.timeLeft <= 0) {
      maxResult = Math.max(maxResult, path.resourcePool[types.GEODE]);
      continue;
    }

    let splitPaths = 0;

    splitPaths += splitPathIfPossible(path, types.GEODE, 1);
    splitPaths += splitPathIfPossible(path, types.OBSIDIAN, 4);

    if (path.bots[types.CLAY] < getBotCost(types.OBSIDIAN, types.CLAY) - 1) { splitPaths += splitPathIfPossible(path, types.CLAY, 7); }

    if (path.bots[types.ORE] < 4) { splitPaths += splitPathIfPossible(path, types.ORE, 16); }

    if (!splitPaths) {
      paths.push({
        timeLeft: 0,
        bots: path.bots.slice(),
        resourcePool: advancePool(path.resourcePool, path.bots, path.timeLeft),
      });
    }
  }

  return maxResult;
};

const part1 = (blueprints) => blueprints.reduce((res, bp, bpId) => res + run(bp, 24) * (bpId + 1), 0);
const part2 = (blueprints) => blueprints.slice(0, 3).reduce((res, bp) => res * run(bp, 32), 1);

const blueprints = getBlueprints(getInput);

console.log('part1', part1(blueprints));
console.log('part2', part2(blueprints));
