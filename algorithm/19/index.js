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

const types = ['ore', 'clay', 'obsidian', 'geode'];

const quality = () => {
  const complete = [];

  for (const b of blueprints) {
    const geodes = [];

    const queue = [{
      oreR: 1, clayR: 0, obsidianR: 0, geodeR: 0, ore: 0, clay: 0, obsidian: 0, geode: 0, time: 24,
    }];

    const common = (q, cb) => {
      const obj = { ...q };

      cb(obj);

      types.forEach((e) => {
        obj[e] += Math.floor(obj[`${e}R`]);
      });

      types.forEach((e) => {
        obj[`${e}R`] = Math.ceil(obj[`${e}R`]);
      });

      --obj.time;

      if ((obj.time === 1 && obj.geodeR === 0)
     || (obj.time < b.geode.obsidian && obj.obsidian + (obj.obsidianR * obj.time) < b.geode.obsidian)) {
        return;
      }

      let i;

      i = queue.findIndex((e) => e.time <= obj.time && types.every((t) => e[t] <= obj[t] && e[`${t}R`] <= obj[`${t}R`]));

      if (i > -1) {
        queue[i] = obj;
      } else {
        i = queue.findIndex((e) => e.time === obj.time && types.every((t) => e[t] >= obj[t] && e[`${t}R`] >= obj[`${t}R`]));

        if (i < 0) {
          queue.push(obj);
        }
      }
    };

    while (queue.length) {
      const q = queue.shift();

      if (q.time) {
        if (q.time > 1 && b.geode.obsidian <= q.obsidian && b.geode.ore <= q.ore) {
          common(q, (obj) => {
            obj.obsidian -= b.geode.obsidian;
            obj.ore -= b.geode.ore;
            obj.geodeR += 0.5;
          });
        }

        if (q.time > 2 && q.obsidianR < b.geode.obsidian && b.obsidian.clay <= q.clay && b.obsidian.ore <= q.ore) {
          common(q, (obj) => {
            obj.clay -= b.obsidian.clay;
            obj.ore -= b.obsidian.ore;
            obj.obsidianR += 0.5;
          });
        }

        if (q.time > 3 && q.clayR < b.obsidian.clay && b.clay.ore <= q.ore) {
          common(q, (obj) => {
            obj.ore -= b.clay.ore;
            obj.clayR += 0.5;
          });
        }

        if (q.time > 4 && q.oreR < Math.max(b.ore.ore, b.clay.ore, b.obsidian.ore, b.geode.ore) && b.ore.ore <= q.ore) {
          common(q, (obj) => {
            obj.ore -= b.ore.ore;
            obj.oreR += 0.5;
          });
        }

        common(q, () => { });
      } else {
        geodes.push(q.geode);
      }
    }

    complete.push(Math.max(...geodes, 0));
  }

  console.log(complete.map((e, i) => e * (i + 1)).reduce((a, c) => a + c));
};

quality();
