module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['@typescript-eslint', 'import', 'html'],
  extends: ['airbnb-base'],
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    },
    {
      files: ['**/*.spec.ts', 'integration/**/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        // "off" or 0 - turn the rule off
        // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
        // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
        // "no-var": "off",
        'no-console': 'warn',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        'vars-on-top': 'off',
        'no-underscore-dangle': 'off', // var _foo;
        'comma-dangle': 'off',
        'func-names': 'off', // setTimeout(function () {}, 0);
        'prefer-template': 'off',
        'no-nested-ternary': 'off',
        'max-classes-per-file': 'off',
        'consistent-return': 'off',
        'no-restricted-syntax': ['off', 'ForOfStatement'], // disallow specified syntax(ex. WithStatement)
        'prefer-arrow-callback': 'error', // Require using arrow functions for callbacks
        'require-await': 'error',
        'arrow-parens': ['error', 'as-needed'], // a => {}
        'no-param-reassign': ['error', { props: false }],
        'no-unused-expressions': [
          'error',
          {
            allowTernary: true, // a || b
            allowShortCircuit: true, // a ? b : 0
            allowTaggedTemplates: true,
          },
        ],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'max-len': [
          'error',
          {
            code: 120,
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
          },
        ], // prettier의 printWidth 옵션 대신 사용
      },
    },
  ],
};
