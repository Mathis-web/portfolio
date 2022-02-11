const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            // ES6
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // css, sass, scss
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            // images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
        new UglifyJsPlugin()
    ],
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ],
      },
    devServer: {
        static: './dist',
        hot: true,
        open: true
    }

}