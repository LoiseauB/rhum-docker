module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'import',
    'simple-import-sort',
    'react-hooks',
    'prettier',
  ],
  rules: {
    'react/self-closing-comp': 'error',
    'prettier/prettier': 'warn',
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    'simple-import-sort/imports': [
      'warn',
      {
        // Import groups configuration
        groups: [
          // Side effect imports (without export) - e.g., import 'module';
          ['^\\u0000'],

          // External module imports - e.g., import lodash from 'lodash';
          ['^react', '^@?\\w'],

          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

          // Imports for assets, videos or images
          [
            '^@assets/*',
            '\\.bmp$',
            '\\.gif$',
            '\\.jpe?g$',
            '\\.png$',
            '\\.svg$',
            '\\.svg$',
            '\\.webp$',
            '\\.avi$',
            '\\.mov$',
            '\\.mp4$',
            '\\.webm$',
          ],

          // Json, markdown and xml imports
          ['^.*\\.json$', '^.*\\.md$', '^.*\\.xml$'],

          // Style imports.
          ['^.+\\.s?css$'],

          // Anything not matched in another group.
          ['^'],
        ],
      },
    ],
    'import/no-unresolved': 0,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
