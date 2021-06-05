const merge  = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
  mergeStrategy, htmlOptions, config: commonCfg,
} = require('./webpack.common.js');

const mergeClient = merge.smartStrategy(mergeStrategy.client);


const hmrPath = '/__webpack_hmr';

const client = mergeClient(commonCfg.client, {
  mode: 'development',
  entry: {
    build: [
      `webpack-hot-middleware/client?path=${hmrPath}&timeout=20000&reload=true`,
    ],
  },
  output: {
    publicPath: '/',
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: commonCfg.client.output.path,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'vue-style-loader'
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin(htmlOptions),
  ],
});

// No backend bunle is compiling because using webpack dev middleware prevents it.
// Use `npm run dev` instead.

module.exports = {
  client,
  hmrPath,
  resolve: {
    fallback:{
      // "stream": require.resolve("stream-browserify"),
    }
  },
};
