var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');
var apiUrl = "http://myhr-uat.daikuan.com/";
module.exports = {
    entry: {
        'vendor': './src/vendor.ts', //第三方依赖
        'app': './src/app.ts' //应用程序
    },
    output: {
        path: __dirname + '/www',
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        // contentBase: "www", //本地服务器所加载的页面所在的目录
        inline: true, //检测文件变化，实时构建并刷新浏览器
        port: "8012",
        // https: true,
        proxy: {
            '/images/': {
                target: apiUrl,
                secure: false,
                changeOrigin: true,
            },
            '/uploads/': {
                target: apiUrl,
                secure: false,
                changeOrigin: true,
            },
            '/api/': {
                target: apiUrl,
                secure: false,
                changeOrigin: true
            },
        }
    },
    devtool: 'source-map', //source-map
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?sourceMap=true"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader?sourceMap=true', 'sass-loader']
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ]
    },
    plugins: [
        //全局变量
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            plupload: "plupload"
        }),
        new ExtractTextPlugin('styles.css'), //生成对应的css文件
        // 注明共享 层次关系 app- > vendor- > polyfills
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        // 把生成的文件插入到 启动页中
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        // new UglifyJSPlugin({
        //     // warning: false,
        //     // mangle: true,
        //     // compress: {
        //     //     warnings: false,
        //     //     drop_debugger: true,
        //     //     drop_console: true
        //     // }
        // }),
        new CopyWebpackPlugin([{
            from: 'src/assets/lib/show-ui-router',
            to: 'assets/lib/show-ui-router'
        }]),
    ],

}