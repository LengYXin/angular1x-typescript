
/**
 *控制器
 */
import * as GlobalConfig from './config';
import { modularList } from './controllers/modular';
// 模块名称
export let moduleName: string = "samsundot.controllers";
let app = angular.module(moduleName, []);
let clgtate = {};
modularList.forEach(x => {
    try {
        app.controller(x.name, <Function>x.val);
        clgtate[x.name] = x;
    } catch (error) {
        console.error("controllers", error);
    }
});
console.debug("controllers 成功",clgtate);


