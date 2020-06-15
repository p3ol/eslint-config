const eslint = require('eslint');
const ruleComposer = require('eslint-rule-composer');

const rule = new eslint.Linter().getRules().get('camelcase');

const isOptionalPropertyAssigned = node =>
  node.type === 'Identifier' &&
  node.parent.type === 'OptionalMemberExpression' &&
  node.parent.parent.type === 'VariableDeclarator';

module.exports = ruleComposer.filterReports(
  rule,
  problem => {
    if (isOptionalPropertyAssigned(problem.node)) {
      return false;
    }

    return problem;
  },
);
