const path = require('path');

const jsWorkerCommonOptions = {
  workers: 2,
  workerParallelJobs: 50,
  poolParallelJobs: 50,
};

const babelWorkerOptions = {
  ...jsWorkerCommonOptions,
  name: 'babel-pool',
};

module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.(jsx|js)?$/,
    include: [
      path.resolve(__dirname, '../node_modules/react-native'),
      path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
    ],
    use: [
      {loader: 'cache-loader'},
      {loader: 'thread-loader', options: babelWorkerOptions},
      {
        loader: 'babel-loader?cacheDirectory?true',
        options: {
          presets: [
            'module:metro-react-native-babel-preset',
            '@babel/preset-flow',
          ],
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'url-loader',
    include: path.resolve(
      __dirname,
      '../',
      'node_modules/react-native-vector-icons',
    ),
  });

  config.resolve.alias['react-native$'] = require.resolve('react-native-web');

  config.resolve.extensions.push('.js', '.jsx', '.mdx');
  return config;
};
