const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    './common',
    './node',
    './browser',
  ].map(require.resolve),
};
