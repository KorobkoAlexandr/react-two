const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
let devtools = NODE_ENV === 'development' ? 'eval' : false;

module.exports = {
    entry:
        [
        'webpack-dev-server/client?https://localhost:8080/',
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: devtools,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('index.css')
    ],
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname,'src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css']
    },
    resolveLoader: {
        modules: ['node_modules', 'bower_components'],
        moduleExtensions: ['-loader'],
        extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"]
    },
    devServer: {
        https: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['react-hot-loader', 'babel-loader'],
                include: [
                    path.resolve(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                use: new ExtractTextPlugin('index.css').extract([
                    'style-loader',
                    'css-loader'
                ])
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: 'file?name=img/[path][name].[ext]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
            }
        ]
    }
};


if (NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
