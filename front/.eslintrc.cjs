/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/no-mutating-props': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/valid-v-for': 'off',
  },
}
