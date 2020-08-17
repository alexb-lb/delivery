const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = (env, options) => merge(common(env, options), {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '..', 'public', 'dist'),
    port: 3000,
    host: '0.0.0.0',
    // https: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BACKEND_URL: JSON.stringify('http://0.0.0.0:3001/api'),
        FACEBOOK_APP_ID: 539998459924891,
        GOOGLE_API_KEY: JSON.stringify('AIzaSyA3ufX01rEYqHO22RwaoMMDVoyYR7sOhrA'),
      }
    })
  ]
})
