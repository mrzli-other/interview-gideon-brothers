const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      path: false,
      fs: false,
    },
  },
};
