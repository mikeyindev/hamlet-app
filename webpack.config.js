const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

// console.log(path.join(__dirname, 'public'));
// Find out the absolute path of the project then concatenate it with
// path.join(), a node function. The output path in webpack.config requires an
// absolute path console.log(__dirname);

// If NODE_ENV is not set, default to 'development'. NODE_ENV is set to
// 'production' by Heroku and to 'test' by the test script.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Node env variables don't get passed down to client-side JavaScript files like
// 'bundle.js'. They need to be manually passed to bundle.js.
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
  const isProduction = env ==='production';
  // console.log('env', env);

  return {
    mode: "development",
    // entry: "./src/app.js",
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: "bundle.js"
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      })
    ],
    module: {
      rules: [
        {
          // Run the babel-loader plugin for every JS file using the presets in
          // the .babelrc file
          loader: "babel-loader",
          // Only look for JS files
          test: /\.js$/,
          // Exclude node_modules directory
          exclude: /node_modules/
        },
        {
          // The '?' following 's' makes 's' optional, so webpack recognizes both CSS and SCSS files 
          test: /\.s?css$/,
          // Use lets you specify multiple loaders. sass-loader uses node-sass to
          // convert CSS to SASS
          use: [MiniCSSExtractPlugin.loader, 
            {
              loader: 'css-loader', 
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    // source-map is more suited to production build as it's larger;
    // cheap-module-eval-source-map is faster to build but shows transformed
    // code.
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, "public"),
      // Ask server to fallback to index.html when a resource can't be found.
      // We're returning index.html for all routes since we're doing client-side
      // routing
      historyApiFallback: true,
      // The default is the public directory
      publicPath: '/dist/'
    }
  }
};