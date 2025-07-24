module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          $assets: './app/(ludo)/src/assets',
          $constants: './app/(ludo)/src/constants',
          $components: './app/(ludo)/src/components',
          $helpers: './app/(ludo)/src/helpers',
          $screens: './app/(ludo)/src/screens',
          $redux: './app/(ludo)/src/redux',
          $hooks: './app/(ludo)/src/hooks',
          $navigation: './app/(ludo)/src/navigation',
        },
      }],
      'react-native-reanimated/plugin',
      'expo-router/babel',
    ],
  };
};
