var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var BuildingPlugin = require('./BuildingPlugin.js');
// BuildingPlugin.controller();
// BuildingPlugin.css();

module.exports = {
    entry: "./src/app-build.ts",
    output: {
        path: __dirname + '/www/dist', //输出目录
        filename: 'app.js', //输出文件名
        publicPath: '/dist', //启动webpack-dev-server服务时，实际上不生成文件，这里对应的是内存中的目录；
    },
    devtool: 'source-map', //source-map
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            warning: false,
            mangle: true,
            comments: false
        }),
        //全局变量
        // new webpack.ProvidePlugin({
        //     plupload: "plupload"
        // }),
        new ExtractTextPlugin('styles.css'), //生成对应的css文件
    ],
    module: {
        rules: [{
                // test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                query: {
                    minimize: true
                }
            },
            {
                test: /\.png$/,
                use: { loader: 'url-loader', options: { limit: 100000 } },
            },
            // {
            //     test: /\.jpg$/,
            //     use: ['file-loader']
            // },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
}