const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const COMMON = {
    entry: './src/main/js/index.js',
    output: {
        path: './src/main/webapp',
        filename: 'bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        inject: false,
        template: require('html-webpack-template'),
        appMountId: 'app'
    })],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    "presets": ["es2015", "react"],
                    "plugins": ["react-hot-loader/babel"]
                }
            },
            { test: /\.s?css$/,
                loader: "style-loader!css-loader!sass-loader!" },
        ]
    }
};

module.exports = COMMON;