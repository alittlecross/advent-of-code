const { trace } = require('./index');

console.log(trace()
  .map((e, i) => (i % 40 === e[0] - 1 || i % 40 === e[0] || i % 40 === e[0] + 1 ? '#' : '.'))
  .join('')
  .match(/.{1,40}/g));
