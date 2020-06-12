const eslint = require('eslint');
const ruleComposer = require('eslint-rule-composer');

const rule = new eslint.Linter().getRules().get('no-extra-parens');

const isConditionalOrLogicalSpread = node =>
  (
    node.type === 'ConditionalExpression' ||
    node.type === 'LogicalExpression'
  ) && (
    node.parent.type === 'SpreadElement' ||
    node.parent.type === 'ExperimentalSpreadProperty'
  );

module.exports = ruleComposer.filterReports(
  rule,
  problem => {
    if (isConditionalOrLogicalSpread(problem.node)) {
      return false;
    }

    return problem;
  },
);
