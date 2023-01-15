const { pathFinder } = require('./index');

const getMax = () => {
  const paths = pathFinder(26);

  let max = 0;

  for (let a = 1; a < paths.length; a++) {
    if (paths[0].flow + paths[a].flow > max) {
      for (let b = a + 1; b < paths.length; b++) {
        if (paths[a].flow + paths[b].flow > max && paths[a].steps.every((e) => !paths[b].steps.includes(e))) {
          max = Math.max(max, paths[a].flow + paths[b].flow);
        }
      }
    }
  }

  return max;
};

console.log(getMax());
