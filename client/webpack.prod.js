const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = (env, options) => merge(common(env, options), {
  mode: 'production',
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BACKEND_URL: JSON.stringify('https://prostomarkets.com/api'),
        FACEBOOK_APP_ID: 539998459924891,
        GOOGLE_API_KEY: JSON.stringify('AIzaSyA3ufX01rEYqHO22RwaoMMDVoyYR7sOhrA'),
      }
    })
  ]
})
