/**
 * 过滤器
 * 导入对应的 模块后 将 模块 添加到 filterList 中即可 
 */
import * as GlobalConfig from './config';
import { modularList } from './filters/modular';
// 模块名称
export let moduleName: string = "samsundot.filter";

let app = angular.module(moduleName, []);
let clgtate = {};
modularList.forEach(x => {
    app.filter(x.name, x.val);
    clgtate[x.name] = x;
});
console.debug("filter 成功", clgtate);
