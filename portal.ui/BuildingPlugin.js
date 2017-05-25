var path = require('path');
var fs = require("fs");
"use strict";

function BuildingPlugin(options) {
    this.ControllerStr = ""; //用于检查控制器是否改变 改变后重新编译，否侧跳过
    this.DirectivesStr = ""; //用于检查控制器是否改变 改变后重新编译，否侧跳过
    this.FiltersStr = ""; //用于检查控制器是否改变 改变后重新编译，否侧跳过
    this.ServicesStr = ""; //用于检查控制器是否改变 改变后重新编译，否侧跳过
    this.ControllerStr = ""; //用于检查控制器是否改变 改变后重新编译，否侧跳过
    this.CssStr = ""; //用于检查css是否改变 改变后重新编译，否侧跳过
    // 缓存实例
    var instance;
    BuildingPlugin = function BuildingPlugin() {
        return instance;
    };
    BuildingPlugin.prototype = this;
    // 实例
    instance = new BuildingPlugin();
    // 重设构造函数指针
    instance.constructor = BuildingPlugin;
    return instance;
}
/**
 * 生成服务
 */
BuildingPlugin.prototype.services = function(Catalog1, Catalog2, fileName) {
    if (!Catalog1 || !Catalog2 || !fileName) {
        throw "参数不齐全";
    }
    var lines = [];
    var url = path.join(__dirname, Catalog1, Catalog2);
    lines.push("/*此文件由node自动生成 无需修改 （BuildingPlugin.js） */");
    lines.push("//" + Catalog2);
    lines.push("let modularList: { name: string, val: { $type?: any } }[] = [];");
    fs.readdirSync(url).forEach(function(d_name) {
        var d_info = fs.statSync(path.join(url, d_name));
        if (!d_info.isDirectory()) return;
        fs.readdirSync(path.join(url, d_name)).forEach(function(f_name) {
            var fullname = path.join(url, d_name, f_name);
            var f_info = fs.statSync(fullname);
            if (f_info.isDirectory()) return;
            if (path.extname(fullname) != ".ts") return;
            var dir = d_name;
            var name = path.basename(fullname, ".ts");
            var impname = name.replace(".", "_");
            lines.push("//   " + dir + "/" + name);
            lines.push("import " + impname + " from './" + dir + "/" + name + "';");
            lines.push("modularList.push({ name: '" + name + "',  val:" + impname + "});");
        });
    });
    lines.push("export { modularList };");
    if (this.ServicesStr != lines.toString()) {
        // console.log('                      ------Start 生成控制器!------                  ');
        fs.writeFileSync(path.join(__dirname, Catalog1, Catalog2, fileName), lines.join("\n"));
        console.log('                       ------End 生成' + Catalog2 + '!------                  ');
        this.ServicesStr = lines.toString();
    }
};
/**
 * 生成指令 获取 过滤器
 */
BuildingPlugin.prototype.directivesOrFilters = function(Catalog1, Catalog2, fileName) {
    if (!Catalog1 || !Catalog2 || !fileName) {
        throw "参数不齐全";
    }
    var lines = [];
    var url = path.join(__dirname, Catalog1, Catalog2);
    lines.push("/*此文件由node自动生成 无需修改 （BuildingPlugin.js） */");
    lines.push("//" + Catalog2);
    lines.push("let modularList: { name: string, val: any }[] = [];");
    fs.readdirSync(url).forEach(function(d_name) {
        var d_info = fs.statSync(path.join(url, d_name));
        if (!d_info.isDirectory()) return;
        fs.readdirSync(path.join(url, d_name)).forEach(function(f_name) {
            var fullname = path.join(url, d_name, f_name);
            var f_info = fs.statSync(fullname);
            if (f_info.isDirectory()) return;
            if (path.extname(fullname) != ".ts") return;
            var dir = d_name;
            var name = path.basename(fullname, ".ts");
            var impname = name.replace(".", "_");
            lines.push("//   " + dir + "/" + name);
            lines.push("import " + impname + " from './" + dir + "/" + name + "';");
            lines.push("modularList.push({ name: '" + name + "',  val:" + impname + ".$instance});");
        });
    });
    lines.push("export { modularList };");
    if (Catalog2 == "directives") {
        if (this.DirectivesStr != lines.toString()) {
            fs.writeFileSync(path.join(__dirname, Catalog1, Catalog2, fileName), lines.join("\n"));
            console.log('                       ------End 生成' + Catalog2 + '!------                  ');
            this.DirectivesStr = lines.toString();
        }
    } else {
        if (this.FiltersStr != lines.toString()) {
            fs.writeFileSync(path.join(__dirname, Catalog1, Catalog2, fileName), lines.join("\n"));
            console.log('                       ------End 生成' + Catalog2 + '!------                  ');
            this.FiltersStr = lines.toString();
        }
    }

};
/**
 * 生成控制器
 *  Catalog1, Catalog2 路劲
 * fileName 需要生成的文件名
 */
BuildingPlugin.prototype.controller = function(Catalog1, Catalog2, fileName) {
    if (!Catalog1 || !Catalog2 || !fileName) {
        throw "参数不齐全";
    }
    var lines = [];
    var url = path.join(__dirname, Catalog1, Catalog2);
    lines.push("/*此文件由node自动生成 无需修改 （BuildingPlugin.js） */");
    lines.push("//controller");
    lines.push("let modularList: yxInterface.IControllerModular[] = [];");
    fs.readdirSync(url).forEach(function(d_name) {
        var d_info = fs.statSync(path.join(url, d_name));
        if (!d_info.isDirectory()) return;
        fs.readdirSync(path.join(url, d_name)).forEach(function(f_name) {
            var fullname = path.join(url, d_name, f_name);
            var f_info = fs.statSync(fullname);
            if (f_info.isDirectory()) return;
            if (path.extname(fullname) != ".ts") return;
            var dir = d_name;
            var name = path.basename(fullname, ".ts");
            var impname = (dir + "_" + name).replace(/[`\-~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/g, "_");
            var random = ""; //Math.floor(Math.random() * 1000);
            // var ctl = dir + "$" + name.replace(/-/g, '_');
            // lines.push(dir + name + ctl);
            lines.push("//   " + dir + "/" + name);
            lines.push("import " + impname + " from './" + dir + "/" + name + "';");
            var cname = dir == name ? name : dir + "/" + name;
            cname = cname.replace(/[`\-]/g, "/");
            lines.push("modularList.push({ name: '" + cname + "', url: '" + dir + "/" + name + "', val:" + impname + " });");
        });
    });
    lines.push("export { modularList };");
    // console.log(this.ControllerStr);
    // console.log(this.ControllerStr != lines.toString());
    if (this.ControllerStr != lines.toString()) {
        // console.log('                      ------Start 生成控制器!------                  ');
        fs.writeFileSync(path.join(__dirname, Catalog1, Catalog2, fileName), lines.join("\n"));
        console.log('                       ------End 生成' + Catalog2 + '!------                  ');
        this.ControllerStr = lines.toString();
    }
};
/**
 * 生成css
 */
BuildingPlugin.prototype.css = function() {
    // console.log("--------------------------------------------css");
    var lines = [];
    lines.push("/*本文件由webpack过程自动生成，不要手工修改！*/");
    lines.push("/*yinzx@samsundot.com 2017-01-09*/");
    lines.push("");
    var biz_dir = path.join(__dirname, "css");
    fs.readdirSync(biz_dir).forEach(function(f_name) {
        var f_info = fs.statSync(path.join(biz_dir, f_name));
        if (f_info.isDirectory()) return;
        var fullname = path.join(biz_dir, f_name);
        if (path.extname(fullname) != ".css") return;
        var name = path.basename(fullname, ".css") + '.css';
        lines.push("import '../css/" + name + "'");
    });
    if (this.CssStr != lines.toString()) {
        // console.log('                      ------Start 生成css!------                  ');
        fs.writeFileSync(path.join(__dirname, "src", "css.ts"), lines.join("\n"));
        console.log('                       ------End 生成css!------                  ');
        this.CssStr = lines.toString();
    }
};

module.exports = new BuildingPlugin();