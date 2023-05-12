semi: false,
module.exports = {
  ignorePatterns: ['/*', '!/src'],
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard-with-typescript', 'plugin:solid/typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  parserOptions: {
    project: ['./tsconfig.json']
  },
  plugins: ['prettier'],
  rules: {
    "space-before-function-paren": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/space-before-function-paren": 0,
    "indent": "off",
    "@typescript-eslint/indent": "off",
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        "prettier.tabWidth": 2,
        semi: false
      }
    ]
  }
}