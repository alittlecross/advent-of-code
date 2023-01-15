const { compare, getInput } = require('./index');

console.log(compare(getInput()
  .reduce((a, c, i) => {
    if (!a[Math.floor(i / 3)]) {
      a.push([]);
    }

    a[Math.floor(i / 3)].push(c);

    return a;
  }, [])));
