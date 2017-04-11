let WebpackDevServer = require('webpack-dev-server');
let webpack = require('webpack');
let config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    filename: config.output.filename,
    hot: true,
    quiet: false,
    https: config.devServer.https,
    noInfo: false
}).listen(8080);
