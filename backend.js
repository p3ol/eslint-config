const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [require.resolve('./common')],
  env: {
    node: true,
  },
};
