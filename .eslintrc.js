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
    ecmaVersion: 2020,
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
    'no-await-in-loop': 'off',
    'no-promise-executor-return': 'off',
  },
  settings: {
    react: {
      version: '17.0.2',
    },
  },
};
