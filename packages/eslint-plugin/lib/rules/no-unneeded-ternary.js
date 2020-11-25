const eslint = require('eslint');
const ruleComposer = require('eslint-rule-composer');

const rule = new eslint.Linter().getRules().get('no-unneeded-ternary');

const isCallOrAssignment = node =>
  ['CallExpression', 'AssignmentExpression'].includes(node.type);

module.exports = ruleComposer.joinReports([rule, context => {
  return {
    ExpressionStatement (node) {
      if (
        node.expression.type === 'ConditionalExpression' &&
        (
          isCallOrAssignment(node.expression.consequent) ||
          isCallOrAssignment(node.expression.alternate)
        )
      ) {
        context.report({
          node,
          message: 'Unnecessary use of ternary expression instead of ' +
            'normal conditional expression.',
        });
      }
    },
  };
}]);
