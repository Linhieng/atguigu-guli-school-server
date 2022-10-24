module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    // * ************************************************************** * \\
    // * ************************************************************** * \\
    // * ************************************************************** * \\
    // * ************************************************************** * \\
    // * ************************** 分割线 ***************************** * \\
    // * ************************************************************** * \\
    // * ************************************************************** * \\
    // * ************************************************************** * \\
    // * ************************************************************** * \\
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    // 'no-unused-vars': ['error', { 'argsIgnorePattern': '^_$' }],
    'keyword-spacing': ['error', { 'before': true }],
    'space-before-function-paren': ['error', 'always'],
    'eqeqeq': ['error', 'always'],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'brace-style': 'error',
    'curly': ['error', 'multi-line'], // 单行时允许省略花括号
    'handle-callback-err': 'error',
    // no-undef
    // no-multiple-empty-lines
    'one-var': ['error', 'never'],
    'no-cond-assign': ['error', 'always'],
    'block-spacing': 'error',
    // camelcase
    'comma-dangle': ['error', 'always-multiline'],
    'comma-style': ['error', 'last'],
    'dot-location': ['error', 'property'],
    // eol-last
    'func-call-spacing': ['error', 'never'],
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    'new-cap': ['error', {
      'capIsNewExceptions': [
        'Router',
      ],
    }],
    'new-parens': 'error',
    // accessor-pairs
    // constructor-super
    'no-array-constructor': 'error',
    // no-caller
    'no-class-assign': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    // no-control-regex
    // no-debugger
    // no-delete-var
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    // no-empty-character-class
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-boolean-cast': 'error',
    // 'no-extra-parens': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-func-assign': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-require': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-path-concat': 'error',
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-regex-spaces': 'error',
    'no-return-assign': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unsafe-negation': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    // 'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    // object-property-newline
    // padded-blocks
    'rest-spread-spacing': 'error',
    'semi-spacing': ['error', { 'before': false, 'after': true }],
    'space-before-blocks': 'error',
    // space-in-parens
    'space-in-parens': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always', { 'markers': ['/'] }],
    'template-curly-spacing': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'wrap-iife': 'error',
    'yield-star-spacing': 'error',
    'yoda': 'error',
    'semi': ['error', 'never'],
    'no-unexpected-multiline': 'error',
  },
}
