/**
 * Created by Administrator on 2017/12/26.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
//  __dirname是nodeJs中的全局变量，指向当前执行脚本的所在目录
module.exports = {
    devtool: "cheap-module-source-map", //打包方式
    entry: __dirname + "/app/main.js", //唯一入口
    output: {
        path: __dirname + "/dist", //打包后文件存放的地方
        filename: "js/bundle[hash:6].js",  //打包后输出文件的文件名
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true
        })
    ],
    devServer: {
        contentBase: "./dist",  //本地服务器加载页面目录
        port: 9000,  //端口号
        inline: true,  //实时刷新
        historyApiFallback: true  //不跳转,单页面指向地址
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, //指定启用css modules
                            localIdentName: "[name]__[local]--[hash:base64:5]"
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192&name=images/[hash:2].[name].[ext]"
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            }
        ]
    }
}