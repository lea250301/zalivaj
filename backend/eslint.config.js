import eslint from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/**', 'uploads/**'] },
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];