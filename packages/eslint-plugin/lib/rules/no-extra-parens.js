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

const isWhileAssignment = node =>
  node.type === 'AssignmentExpression' &&
  node.parent.type === 'WhileStatement';

module.exports = ruleComposer.filterReports(
  rule,
  (problem, metadata) => {
    if (isConditionalOrLogicalSpread(problem.node)) {
      return false;
    }

    if (
      metadata.options[1] &&
      metadata.options[1].enforceForSequenceExpressions === false &&
      isWhileAssignment(problem.node)
    ) {
      return false;
    }

    return problem;
  },
);
