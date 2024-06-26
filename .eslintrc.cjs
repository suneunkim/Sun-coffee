module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect', // React 버전을 자동으로 감지합니다.
    },
  },
  extends: [
    //'eslint:recommended', // 기본 ESLint 규칙
    //'plugin:react/recommended', // React 권장 규칙
    //'plugin:@typescript-eslint/recommended', // TypeScript 권장 규칙
    //'plugin:react-hooks/recommended', // React Hooks 권장 규칙
    'prettier', // Prettier와 충돌을 방지하기 위해 추가
    'plugin:prettier/recommended', // Prettier 권장 규칙 및 eslint-plugin-prettier 활성화
  ],
  ignorePatterns: ['dist', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react',
    'prettier', // Prettier 플러그인 추가
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'warn', // console.log 사용 시 경고
    'react/react-in-jsx-scope': 'off', // import React from 'react' 필요 없음
    'prettier/prettier': [
      // Prettier 규칙을 ESLint 규칙으로 추가
      'error',
      {
        // 여기에 추가적인 Prettier 옵션을 설정할 수 있습니다.
        semi: false,
        singleQuote: true,
      },
    ],
  },
}
