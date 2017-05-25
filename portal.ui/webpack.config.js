//todo:webpack使用最新版?
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var BuildingPlugin = require('./BuildingPlugin.js');
// BuildingPlugin.controller();
// BuildingPlugin.css();
// var apiUrl = "http://192.168.152.68:8080/";
var apiUrl = "http://myhr-uat.daikuan.com/"
    // http://www.jbrantly.com/typescript-and-webpack/  配置项
module.exports = {
    // entry: './src/app.ts', //入口文件，webpack从这里开始分析
    entry: {
        app: ["./src/app.ts"]
    },
    output: {
        path: __dirname + '/www/assets/dist', //输出目录
        filename: 'app.js', //输出文件名
        publicPath: '/assets/dist/', //启动webpack-dev-server服务时，实际上不生成文件，这里对应的是内存中的目录；
    },
    devServer: {
        contentBase: "www", //本地服务器所加载的页面所在的目录
        inline: true, //检测文件变化，实时构建并刷新浏览器
        port: "8088",
        https: true,
        proxy: {
            '/qiniu/*': {
                target: 'http://10.100.83.25:8080',
                secure: false
            },
            // '/hrportalapi/': {
            //     target: apiUrl,
            //     secure: false
            // },
            '/v5': { //获取天气 api
                target: "https://free-api.heweather.com/",
                secure: false,
                changeOrigin: true,
            },
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
            '/myhr.api/': {
                target: apiUrl,
                secure: false,
                changeOrigin: true,
                logLevel: 'debug'
            },
            '/api/': {
                target: apiUrl,
                // target: "http://myhr-uat.daikuan.sundot.cn/",
                // target: "http://127.0.0.1:8080/",pathRewrite: {"^/api" : "/hrportalapi"},onProxyReq:function (proxyReq, req, res) {console.info('devServer.proxy.path:' + proxyReq.path)},
                secure: false,
                changeOrigin: true
            },
            '/scf/': { //scf工作流引擎
                // target: 'http://127.0.0.1:9901/',
                target: 'http://api.scf.sundot.cn/',
                secure: false,
                changeOrigin: true,
                pathRewrite: { "^/scf": "" }
            },
        }
    },
    devtool: 'source-map', //source-map
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.ts', '.js']
    },
    plugins: [
        //全局变量
        new webpack.ProvidePlugin({
            // plupload: "plupload"
        }),
        new ExtractTextPlugin('styles.css'), //生成对应的css文件
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?sourceMap=true&minimize=true&url=false"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader?sourceMap=true&minimize=true&url=false', 'sass-loader']
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                query: {
                    minimize: true
                }
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
}