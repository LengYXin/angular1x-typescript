var gulp = require("gulp");
var gutil = require("gulp-util");
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var templateCache = require('gulp-angular-templatecache');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var webpackConfigBuild = require("./webpack.build.js");
var BuildingPlugin = require('./BuildingPlugin.js');
// 先生成 各个模块
BuildingPlugin.services("src", "services", "modular.ts");
BuildingPlugin.directivesOrFilters("src", "filters", "modular.ts");
BuildingPlugin.directivesOrFilters("src", "directives", "modular.ts");
BuildingPlugin.controller("src", "controllers", "modular.ts");
BuildingPlugin.css();
gulp.task('test', function(done) {
    // BuildingPlugin.test("src", "directives", "modular.ts");
    BuildingPlugin.services("src", "services", "modular.ts");
    done();
});

var localhost = "http://localhost:" + webpackConfig.devServer.port + "/";

gulp.task('ts', ['templateCache'], function(done) {
    del(['build/**']);
    webpack(webpackConfigBuild, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build", err);
        done();
    });
});
/**
 * webpack develop server
 */
gulp.task('ts2', function(done) {
    webpackConfig.entry.app.unshift("webpack-dev-server/client?" + localhost);
    var compiler2 = webpack(webpackConfig);
    setTimeout(function() {
        new WebpackDevServer(compiler2, {
            contentBase: webpackConfig.devServer.contentBase,
            publicPath: webpackConfig.output.publicPath,
            proxy: webpackConfig.devServer.proxy
        }).listen(webpackConfig.devServer.port, 'localhost', function(err) {
            if (err) throw new gutil.PluginError('webpack-dev-server', err)
            gutil.log('[webpack-dev-server]', localhost)
            done();
        });
    }, 5000);
});
gulp.task('watch', function(done) {
    function sw(type, cb) {
        console.log("******************************************" + type);
        // switch (type) {
        //     case 'deleted': //删除文件
        //         cb();
        //     case 'added': //添加文件
        //         cb();
        //         break;
        //     case 'changed': //修改文件
        //         break;
        //     default:
        //         break;
        // }
        setTimeout(function() {
            cb();
        }, 3000);
    }
    // services
    gulp.watch('src/services/**/*.ts', function(event) {
        sw(event.type.toString(), function() { BuildingPlugin.services("src", "services", "modular.ts") });
    });
    // filters
    gulp.watch('src/filters/**/*.ts', function(event) {
        sw(event.type.toString(), function() { BuildingPlugin.directivesOrFilters("src", "filters", "modular.ts") });
    });
    // directives
    gulp.watch('src/directives/**/*.ts', function(event) {
        sw(event.type.toString(), function() { BuildingPlugin.directivesOrFilters("src", "directives", "modular.ts") });
    });
    // 控制器
    gulp.watch('src/controllers/**/*.ts', function(event) {
        sw(event.type.toString(), function() { BuildingPlugin.controller("src", "controllers", "modular.ts") });
    });
    // css
    gulp.watch('css/*.css', function(event) {
        sw(event.type.toString(), BuildingPlugin.css);
    });
    done();
});

gulp.task('templateCache', function() {
    console.log("                       ------ 处理html 模板文件 ------");
    return gulp.src('www/**/*.tpl.html')
        .pipe(templateCache({
            templateHeader: 'angular.module("<%= module %>",[]).run(["$templateCache", function($templateCache) {',
        }))
        .pipe(gulp.dest('src/baseClass'));
});
gulp.task('default', ['watch', 'ts2']);
gulp.task('build', ['ts'], function(done) {
    gulp.src('www/*.html')
        .pipe(gulp.dest('build'));
    gulp.src('www/assets/**')
        .pipe(gulp.dest('build/assets'));
    gulp.src('www/dist/*.js')
        .pipe(gulp.dest('build/dist'));
    gulp.src('www/dist/*.map')
        .pipe(gulp.dest('build/dist'));
    gulp.src('www/dist/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/dist'));
    gulp.src('www/languages/**')
        .pipe(gulp.dest('build/languages'));
    console.log('                       ------ 拷贝项目目录下的 build 文件夹 ------');
    done();
});

var ftp = require('vinyl-ftp');
gulp.task('ftp', ['build'], function() {

    setTimeout(function() { //延时1秒执行，否则有时候会无法传输ftp文件
        var conn = ftp.create({
            host: '10.100.83.25',
            user: 'admin',
            password: 'admin',
            parallel: 10,
            log: gutil.log
        });

        return gulp.src(['build/**/**'], { base: 'build', buffer: false })
            .pipe(conn.newer('/admin.lefengxian.com')) // only upload newer files
            .pipe(conn.dest('/admin.lefengxian.com'));
    }, 1000);
});