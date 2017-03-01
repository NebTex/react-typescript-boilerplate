var path = require("path");
var webpack = require("webpack");

var config = {
  entry: ["./src/app.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat",
      "react-addons-css-transition-group": "rc-css-transition-group"
    }
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [/node_modules/, /__tests__/, "*.spec.ts"]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:6]'
        }, {
          loader: 'resolve-url-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = config;