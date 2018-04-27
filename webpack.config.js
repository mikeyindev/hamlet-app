const path = require('path');
// Export this object

console.log(path.join(__dirname, 'public'));
// Find out the absolute path of the project then concatenate it with 
// path.join(), a node function. The output path in webpack.config requires an absolute path
// console.log(__dirname);

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      // Run the babel-loader plugin for every JS file using the presets in the .babelrc file
      loader: 'babel-loader',
      // Only look for JS files
      test: /\.js$/,
      // Exclude node_modules directory
      exclude: /node_modules/
    }]
  },
  devtool: 'cheap-module-eval-source-map'
};