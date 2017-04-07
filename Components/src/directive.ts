
/**
 * 指令
 *  导入对应的 模块后 将 模块 添加到 directiveList 中即可 
 */
import * as GlobalConfig from './config';
import { modularList } from './directives/modular';
// 模块名称
export let moduleName: string = "samsundot.directive";
let app = angular.module(moduleName, []);
let clgtate = {};
modularList.forEach(x => {
    app.directive(x.name, x.val);
    clgtate[x.name] = x;
});
console.debug("directive 成功",clgtate);



