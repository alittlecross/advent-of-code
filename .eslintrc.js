module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    camelcase: 0,
    'max-len': ['error', {
      code: 200,
    }],
    'no-cond-assign': 0,
    'no-continue': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
  },
};
