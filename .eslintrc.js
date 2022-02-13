const { resolve } = require('path');

module.exports = {
  extends: [
    'airbnb',
    'plugin:lit/recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    'import',
    'lit',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: false,
      modules: true,
    },
  },
  rules: {
    // Browser environment requires them.
    'import/extensions': ['error', 'ignorePackages'],
    // Allow warnings and errors; logs are debugging
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // Allows React-style components
    'lit/binding-positions': 'off',
    // Allows generic closers (</>)
    'lit/no-invalid-html': 'off',
  },
  settings: {
    'import/resolver': {
      [resolve(__dirname, './tools/urlResolver.js')]: {},
    },
    react: {
      version: '17.0.2',
    },
  },
};
