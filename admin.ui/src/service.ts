/**
 * 服务
 * 导入对应的 模块后 将 模块 添加到 servicesList 中即可 
 * Lyx 开头都为自定义服务
 */
import * as GlobalConfig from './config';
import { modularList } from './services/modular';
import serHelper from './services/helper/serHelper';
import serBusiness from './services/business/serBusiness';

//导出 共有服务给 外部ts 提示使用
export { serHelper, serBusiness };
// 模块名称
export let moduleName: string = "samsundot.services";

let app = angular.module(moduleName, []);
let clgtate = {};
modularList.forEach(x => {
    inject(x.name, x.val);
    clgtate[x.name] = x;
});
console.debug("services 成功", clgtate);
//根据服务种类 分别注入到 ng 中 默认 为 server 
function inject(key, ser: any) {
    switch (ser.$type) {
        case GlobalConfig.EnumServicesType.service:
            app.service(key, ser);
            break;
        case GlobalConfig.EnumServicesType.factory:
            app.factory(key, ser);
            break;
        case GlobalConfig.EnumServicesType.provider:
            app.provider(key, ser);
            break;
        default:
            app.service(key, ser);
            break;
    }
}
