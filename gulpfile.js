var gulp = require("gulp");
var path = require('path');
var fs = require('fs');
var through = require('through2');

/**
 * 创建模块
 * @param {*} options 
 */
function createComponent(options) {
    if (!options && !options.path) {
        throw new Error("path? not null");
    }
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            // 返回空文件
            cb(null, file);
        }
        // if (file.isBuffer()) {
        //     // file.contents = Buffer.concat([prefixText, file.contents]);
        //     console.log(" isBuffer", file);
        // }
        // if (file.isStream()) {
        //     // file.contents = file.contents.pipe(prefixStream(prefixText));
        //     console.log(" isStream", file);
        // }
        var lines = [];
        var url = path.join(__dirname, options.path);
        fs.readdirSync(url).forEach(function (d_name) {
            var d_info = fs.statSync(path.join(url, d_name));
            // 跳过 非 根目录文件和含有非法字符的目录
            if (!d_info.isDirectory() || /[`\-~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\.\\\/;'\[\]]/.test(d_name)) return;
            fs.readdirSync(path.join(url, d_name)).forEach(function (f_name) {
                var fullname = path.join(url, d_name, f_name);
                var name = path.basename(fullname, ".ts");
                var f_info = fs.statSync(fullname);
                if (f_info.isDirectory()) return;
                if (path.extname(fullname) != ".ts") return;
                // 跳过 非 根目录文件和含有非法字符的目录
                if (/[`\-~!@#\$%\^\&\*\(\)\+<>\?:"\{\},\.\\\/;'\[\]]/.test(name)) return;
                var dir = d_name;
                // var impname = name.replace(".", "_");
                lines.push({
                    name: name,
                    route: dir + "/" + name,
                    url: "'./" + dir + "/" + name + "'"
                });
            });
        });
        var impr = lines.map(x => `import ${x.name} from ${x.url};`).join("\n ");
        var exp = lines.map(x => {
            // 生成 路由
            if (options.generatingPath) {
                return `{Key:'${x.name}',Route:'${x.route}',Value:${x.name}},`
            } else {
                return x.name + ","
            }
        }).join("\n");
        // options.generatingPath=true 导出的为数组
        file.contents = new Buffer(`${impr} \n export default ${options.generatingPath?`[ \n ${exp} \n ]`:`{\n ${exp} \n }` };`);
        cb(null, file);
    });
};
/**
 * 创建  index 文件
 * @param {*} controllersPath 模块目录 
 * @param {*} generatingPath  是否生成 路由 (模块 控制器 使用)
 */
function createImport(controllersPath, generatingPath) {
    var pathindex = path.join(__dirname, controllersPath, "index.ts");
    // 没有文件的情况下创建文件
    fs.exists(pathindex, function (exists) {
        if (!exists) {
            fs.writeFile(pathindex, "export default {\n  \n};", function () {
                create();
            });
        } else {
            create();
        }
    })

    function create() {
        gulp.src(controllersPath + 'index.ts')
            .pipe(createComponent({
                path: controllersPath,
                generatingPath: generatingPath
            }))
            .pipe(gulp.dest(controllersPath));
    }
}
// 监控文件变化 生成对应的模块
gulp.task('default', function (done) {
    createImport("src/app/components/", true);
    createImport("src/app/directives/");
    createImport("src/app/filters/");
    // components
    gulp.watch('src/app/components/**/*.ts', function (event) {
        console.log("   ---------    update components    ---------    ");
        if (event.path.lastIndexOf("\\src\\app\\components\\index.ts") == -1) {
            if (event.type == "added" || event.type == "deleted") {
                createImport("src/app/components/", true);
            }
        }
    });
    // directives
    gulp.watch('src/app/directives/**/*.ts', function (event) {
        console.log("   ---------    update directives    ---------    ");
        if (event.path.lastIndexOf("\\src\\app\\directives\\index.ts") == -1) {
            if (event.type == "added" || event.type == "deleted") {
                createImport("src/app/directives/");
            }
        }
    });
    // filters
    gulp.watch('src/app/filters/**/*.ts', function (event) {
        console.log("   ---------    update filters    ---------    ");
        if (event.path.lastIndexOf("\\src\\app\\filters\\index.ts") == -1) {
            if (event.type == "added" || event.type == "deleted") {
                createImport("src/app/filters/");
            }
        }
    });
    done();
});