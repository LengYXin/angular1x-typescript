/**
 * 全局配置模块
 */

//开启调试模式  true  运行项目 观察控制台 请求等信息
export let debug: boolean = true;
export let apiMainUrl: string = "/";
export enum EnumServicesType { service = 1, factory = 2, provider = 4 };
export let buildFN = function () {
    debug = false;
}
