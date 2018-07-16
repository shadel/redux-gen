const path = require('path');

module.exports = {
  entry: './ts/sample/index.tsx',
  output: {
    path: path.resolve(__dirname, './sample'),
    filename: 'index.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.js$/, loader: "babel-loader" },
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
    ]
  }
};