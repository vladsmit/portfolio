const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: ["@babel/polyfill", "./src/index.jsx"]
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'build'),
        filename: 'js/[name].js',
        publicPath: '/dist/build/'
    },
    target: 'web',
    devtool: 'inline-source-map',
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/dist/build/index.html'
        }
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets/[name].[ext]',
                    toType: 'template'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: ['url-loader']
            }
        ]
    }
};