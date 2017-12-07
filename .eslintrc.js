module.exports = {
  extends: ['eslint:recommended'], // extending recommended config and config derived from eslint-config-prettier
  parserOptions: {
    ecmaVersion: '6',
    sourceType: 'module',
  },
  rules: {
    'object-curly-spacing': 0,
  },
  globals: {
    document: true,
    window: true,
    TimelineLite: true,
    TweenLite: true,
    Power1: true,
    Power4: true,
    Promise: true,
  },
};
