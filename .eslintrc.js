module.exports = {
  extends: ['eslint:recommended'], // extending recommended config and config derived from eslint-config-prettier
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'object-curly-spacing': 0,
  },
  globals: {
    TimelineLite: true,
    TweenLite: true,
    Power4: true,
    document: true,
  },
};
