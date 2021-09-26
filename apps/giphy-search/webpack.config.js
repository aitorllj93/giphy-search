const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.entries(process.env).reduce((acc, [key, value]) => Object.assign(acc, { [key]: JSON.stringify(value) }), {}),
    }),
  ],
};
