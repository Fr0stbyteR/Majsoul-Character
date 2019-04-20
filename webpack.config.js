const path = require('path');
const webpack = require('webpack');

const config = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.mp3$/,
        loader: 'url-loader',
        type: 'javascript/auto',
        exclude: /node_modules/,
        options: {
          mimetype: 'audio/mpeg'
        }
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        type: 'javascript/auto',
        exclude: /node_modules/,
        options: {
          mimetype: 'image/png'
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
        raw: true,
        banner: `// ==UserScript==
// @name         Majsoul-12dora
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  12dora mod in Majsoul
// @author       Fr0stbyteR
// @match        https://majsoul.union-game.com/0/
// @grant        none
// @downloadURL  http://86.248.141.45/Majsoul-Character/dist/index.user.js
// ==/UserScript==`
    })
  ]
};
module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = '';
    config.output.filename = 'index.user.js';
  }
  if (argv.mode === 'production') {
    config.output.filename = 'index.min.user.js';
  }
  return config;
};