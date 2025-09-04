import eslint from 'eslint';

import { configs } from './index';

const config = [
  ...configs.react,
  ...configs.reactHooks,
];

describe('@poool/eslint-config-react', () => {
  const linter = new eslint.Linter();

  describe('react/display-name', () => {
    it('should ignore missing display name', () => {
      const code = `
        const Component = () => <div />;
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({ fatal: true }),
      ]));
      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({ ruleId: 'react/display-name' }),
      ]));
    });
  });

  describe('react/jsx-closing-bracket-location', () => {
    it('should pass on aligned bracket with line', () => {
      const code = `
        <Hello
          foo="bar"
          bar="baz"
        />;
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-closing-bracket-location',
        }),
      ]));
    });

    it('should warn on unaligned bracket with line', () => {
      const code = `
        <Hello
          foo="bar"
          bar="baz" />;
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-closing-bracket-location',
          messageId: 'bracketLocation',
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/jsx-closing-tag-location', () => {
    it('should pass on aligned closing tag', () => {
      const code = `
        <Hello>
          foo="bar"
          bar="baz"
        </Hello>;
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-closing-tag-location',
        }),
      ]));
    });

    it('should warn on unaligned closing tag', () => {
      const code = `
        <Hello>
          foo="bar"
          bar="baz"
          </Hello>;
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-closing-tag-location',
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/jsx-curly-brace-presence', () => {
    it('should pass on correct curly braces', () => {
      const code = `<App prop='Hello world'>Hello world</App>;`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-curly-brace-presence',
        }),
      ]));
    });

    it('should warn on unecessary curly brace', () => {
      const code = `<App prop={'Hello world'}>Hello world</App>;`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-curly-brace-presence',
          message: 'Curly braces are unnecessary here.',
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/jsx-equals-spacing', () => {
    it('should pass on correct equals spacing', () => {
      const code = `<Hello name={firstname} />;`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-equals-spacing',
        }),
      ]));
    });

    it('should warn on incorrect spacing aroun equal sign', () => {
      const code = `<Hello name= {firstname} />;`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-equals-spacing',
          message: `There should be no space after '='`,
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/jsx-pascal-case', () => {
    it('should pass on correct pascal case naming', () => {
      const code = `<TestComponent />;`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-pascal-case',
        }),
      ]));
    });

    it('should warn on incorrect pascal case naming', () => {
      const code = `<Test_component />`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-pascal-case',
          message: 'Imported JSX component Test_component must be in ' +
            'PascalCase',
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/jsx-props-no-multi-spaces', () => {
    it('should pass on correct spacing between attributes', () => {
      const code = `<App cozy />`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-props-no-multi-spaces',
        }),
      ]));
    });

    it('should warn on incorrect spacing between attributes', () => {
      const code = `<App too  spacy />`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-props-no-multi-spaces',
          message: 'Expected only one space between “too” and “spacy”',
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/jsx-tag-spacing', () => {
    it('should pass on correct self closing tag spacing', () => {
      const code = `<Hello />`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-tag-spacing',
        }),
      ]));
    });

    it('should warn on correct self closing tag spacing', () => {
      const code = `<Hello/>`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-tag-spacing',
          message: 'A space is required before closing bracket',
          messageId: 'beforeSelfCloseNeedSpace',
          severity: 1,
        }),
      ]));
    });

    it('should warn on incorrect self closing tag spacing', () => {
      const code = `<Hello/>`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-tag-spacing',
          message: 'A space is required before closing bracket',
          messageId: 'beforeSelfCloseNeedSpace',
          severity: 1,
        }),
      ]));
    });

    it('should warn on incorrect opening tag spacing', () => {
      const code = `< Hello firstName="John" />`;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-tag-spacing',
          message: 'A space is forbidden after opening bracket',
          messageId: 'beforeSelfCloseNeedSpace',
          severity: 1,
        }),
      ]));
    });

    it('should warn on incorrect closing tag spacing', () => {
      const code = `
        <Hello firstName="John"></Hello >
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-tag-spacing',
          message: 'A space is forbidden before closing bracket',
          messageId: 'beforeCloseNoSpace',
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/jsx-wrap-multilines', () => {
    it('should pass on correct multiline parens', () => {
      const code = `
        const Hello = () => {
          return (
            <div>
              <h1>Hello world</h1>
            </div>
          );
        };
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).not.toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-wrap-multilines',
        }),
      ]));
    });

    it('should warn when no multiline parens', () => {
      const code = `
        const Hello = () => {
          return <div>
            <h1>Hello world</h1>
          </div>;
        };
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-wrap-multilines',
          message: 'Missing parentheses around multilines JSX',
          messageId: 'missingParens',
          severity: 1,
        }),
      ]));
    });

    it('should warn on incorrect multiline parens', () => {
      const code = `
        const Hello = () => {
          return (<div>
            <h1>Hello world</h1>
          </div>);
        };
      `;

      const res = linter.verify(code, config, 'index.tsx');

      expect(res).toEqual(expect.arrayContaining([
        expect.objectContaining({
          ruleId: 'react/jsx-wrap-multilines',
          message: 'Parentheses around JSX should be on separate lines',
          messageId: 'parensOnNewLines',
          severity: 1,
        }),
      ]));
    });
  });

  describe('react/no-children-prop', () => {
    it('should pass on correct children prop', () => {
      const code = `<MyComponent>Children</MyComponent>`;

      expect(linter.verify(code, config, 'index.tsx'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'react/no-children-prop' }),
        ]));
    });

    it('should fail when passing children as prop', () => {
      const code = `<MyComponent children={<AnotherComponent />} />`;

      expect(linter.verify(code, config, 'index.tsx'))
        .toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'react/no-children-prop',
            message: 'Do not pass children as props. Instead, nest children ' +
              'between the opening and closing tags.',
            messageId: 'nestChildren',
            severity: 2,
          }),
        ]));
    });
  });

  describe('react/no-this-in-sfc', () => {
    it('should pass when no this in SFC', () => {
      const code = `
        function Foo(props) {
          return (
            <div>{props.bar}</div>
          );
        }
      `;

      expect(linter.verify(code, config, 'index.tsx'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'react/no-this-in-sfc' }),
        ]));
    });

    it('should fail when using this in SFC', () => {
      const code = `
        function Foo(props) {
          return (
            <div>{this.props.bar}</div>
          );
        }
      `;

      expect(linter.verify(code, config, 'index.tsx'))
        .toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'react/no-this-in-sfc',
            message: 'Stateless functional components should not use `this`',
            messageId: 'noThisInSFC',
            severity: 2,
          }),
        ]));
    });
  });

  describe('react/self-closing-comp', () => {
    it('should pass when self closing component without children', () => {
      const code = `const HelloJohn = <Hello name="John"/>;`;

      expect(linter.verify(code, config, 'index.tsx'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'react/self-closing-comp' }),
        ]));
    });

    it('should warn when not self closing component without children', () => {
      const code = `const HelloJohn = <Hello name="John"></Hello>;`;

      expect(linter.verify(code, config, 'index.tsx'))
        .toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'react/self-closing-comp',
            message: 'Empty components are self-closing',
            messageId: 'notSelfClosing',
            severity: 1,
          }),
        ]));
    });
  });

  describe('react/void-dom-elements-no-children', () => {
    it('should pass when dom element has no children', () => {
      const code = `<div>Children</div>;`;

      expect(linter.verify(code, config, 'index.tsx'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'react/void-dom-elements-no-children',
          }),
        ]));
    });

    it('should fail when void dom element has children', () => {
      const code = `<br>Children</br>;`;

      expect(linter.verify(code, config, 'index.tsx'))
        .toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'react/void-dom-elements-no-children',
            message: 'Void DOM element <br /> cannot receive children.',
            messageId: 'noChildrenInVoidEl',
            severity: 2,
          }),
        ]));
    });
  });

  describe('jsx-quotes', () => {
    it('should pass when using double quotes in jsx attributes', () => {
      const code = `<Hello a="test" />;`;

      expect(linter.verify(code, config, 'index.tsx'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'jsx-quotes',
          }),
        ]));
    });

    it('should warn when using single quotes in jsx attributes', () => {
      const code = `<Hello a='test' />;`;

      expect(linter.verify(code, config, 'index.tsx'))
        .toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'jsx-quotes',
            message: 'Unexpected usage of singlequote.',
            messageId: 'unexpected',
            severity: 1,
          }),
        ]));
    });
  });

  describe('react-hooks/exhaustive-deps', () => {
    it('should pass when dependencies are correct', () => {
      const code = `
        import { useEffect } from 'react';

        function MyComponent() {
          useEffect(() => {
            console.log('Hello world');
          }, []);

          return <div>Hello world</div>;
        }
      `;

      expect(linter.verify(code, config, 'index.tsx'))
        .not.toEqual(expect.arrayContaining([
          expect.objectContaining({ ruleId: 'react-hooks/exhaustive-deps' }),
        ]));
    });

    it('should warn when dependencies are missing', () => {
      const code = `
        import { useEffect } from 'react';

        function MyComponent({ name }) {
          useEffect(() => {
            console.log(name);
          }, []);

          return <div>{name}</div>;
        }
      `;

      expect(linter.verify(code, config, 'index.tsx'))
        .toEqual(expect.arrayContaining([
          expect.objectContaining({
            ruleId: 'react-hooks/exhaustive-deps',
            message: 'React Hook useEffect has a missing dependency: ' +
              '\'name\'. Either include it or remove the dependency array.',
            severity: 1,
          }),
        ]));
    });
  });
});
