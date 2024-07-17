const path = require('path');

module.exports = {
  entry: './src/index.js', // Update this to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      // Custom middleware setup that was in onBeforeSetupMiddleware
      middlewares.unshift((req, res, next) => {
        // Custom middleware logic here...
        next();
      });

      // Custom middleware setup that was in onAfterSetupMiddleware
      middlewares.push((req, res, next) => {
        // Custom middleware logic here...
        next();
      });

      return middlewares;
    },
  },
};
