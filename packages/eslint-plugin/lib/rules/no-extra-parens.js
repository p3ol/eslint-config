const eslint = require('eslint');
const ruleComposer = require('eslint-rule-composer');

const rule = new eslint.Linter().getRules().get('no-extra-parens');

const isConditionalSpread = node => node.type === 'ConditionalExpression' && (
  node.parent.type === 'SpreadElement' ||
  node.parent.type === 'ExperimentalSpreadProperty'
);

module.exports = ruleComposer.filterReports(
  rule,
  problem => {
    if (isConditionalSpread(problem.node)) {
      return false;
    }

    return problem;
  },
);
