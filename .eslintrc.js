// .eslintrc.js
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended', // 기본 ESLint 규칙
    'plugin:react/recommended', // React 권장 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 규칙
    'plugin:react-hooks/recommended', // React Hooks 권장 규칙
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'warn', // console.log 사용 시 경고
  },
}
