const path = require("path")
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


//For Production mode only
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

//Add Service Workers
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
    module: {
        rules: [
                {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ]
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                    },
        ]
            },
    plugins: [
                new HtmlWebPackPlugin({
                    template: "./src/client/views/index.html",
                    filename: "./index.html",
                }),
                new MiniCssExtractPlugin({ filename: "[name].css" }),
                new WorkboxPlugin.GenerateSW(),
                new CleanWebpackPlugin({
                    // Simulate the removal of files
                    dry: false,
                    // Write Logs to Console
                    verbose: true,
                    // Automatically remove all unused webpack assets on rebuild
                    cleanStaleWebpackAssets: true,
                    protectWebpackAssets: false
                })
            ]
}