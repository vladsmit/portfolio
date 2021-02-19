const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
        publicPath: '/'
    },
    target: 'web',
    devtool: 'source-map',
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsPlugin()
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/dist/build/index.html'
        }
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@styles': path.resolve(__dirname, 'src', 'styles'),
            '@components': path.resolve(__dirname, 'src', 'components'),
            '@containers': path.resolve(__dirname, 'src', 'containers'),
            '@store': path.resolve(__dirname, 'src', 'store'),
            '@actions': path.resolve(__dirname, 'src', 'store', 'actions'),
            '@reducers': path.resolve(__dirname, 'src', 'store', 'reducers'),
            '@middlewares': path.resolve(__dirname, 'src', 'store', 'middlewares')
        }
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
                    to: 'img/[name].[ext]',
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