const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCss = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: { 
        main: "./index.js", 
        user: "./user.js"
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                 collapseWhitespace: isProd 
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, 'dist'),
                    force: true
                }
            ]
        }),
        new MiniCss({
            filename: "[name].[contenthash].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCss.loader ,'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: ['file-loader']
            }
        ]
    }
}