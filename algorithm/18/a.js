const { getDroplet, getFaces } = require('./index');

const surfaces = () => {
  getFaces(getDroplet(), 1);
};

surfaces();
