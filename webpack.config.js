const path = require('path');
const webpack = require('webpack');
const banner = require("./local/banner.js");

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
        banner: banner || `// ==UserScript==
// @name         Majsoul-Character
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Character mod for Majsoul
// @author       Fr0stbyteR
// @match        https://majsoul.union-game.com/0/
// @grant        none
// ==/UserScript==`,
        raw: true,
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