module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'jest/valid-expect': 'off',
  },
};
