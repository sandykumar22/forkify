const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index3.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js3/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'ehome.html',
            template: './src/homepage.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.join(__dirname, '/node_modules'),
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};