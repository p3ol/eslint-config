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

const isAwaitSpread = node => node.type === 'AwaitExpression' && (
  node.parent.type === 'SpreadElement' ||
  node.parent.type === 'ExperimentalSpreadProperty'
);

const isWhileAssignment = node =>
  node.type === 'AssignmentExpression' &&
  node.parent.type === 'WhileStatement';

const isNewSpread = node => node.type === 'NewExpression' && (
  node.parent.type === 'SpreadElement' ||
  node.parent.type === 'ExperimentalSpreadProperty'
);

const isDoubleUnaryAwait = node => node.type === 'AwaitExpression' &&
  node.parent.type === 'UnaryExpression' &&
  node.parent.parent.type === 'UnaryExpression';

module.exports = ruleComposer.filterReports(
  rule,
  (problem, metadata) => {
    if (
      isConditionalOrLogicalSpread(problem.node) ||
      isAwaitSpread(problem.node) ||
      isNewSpread(problem.node) ||
      isDoubleUnaryAwait(problem.node)
    ) {
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
