module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/boolean-prop-naming': 'warn',
    'react/prop-types': 'warn',
    'react/hook-use-state': 'warn',
    'react/no-danger': 'error',
    'react/no-invalid-html-attribute': 'warn',
    'react/no-typos': 'warn',
    'react/prefer-es6-class': 'warn',
  },
};
