
/**************************************
   ******       serBusiness  业务逻辑服务 综合类
  ************************************/
import * as GlobalConfig from '../../config';
import serUser from './serUser';

export default class {
    //服务器类型 默认为 service 
    static $type = GlobalConfig.EnumServicesType.service;
    static $inject = ['serUser'];
    //提供给services 注入模块，无需在services 重复引入模块
    static $Services = {
        serUser: serUser,
    };
    constructor(
        public serUser: serUser,
    ) {
        GlobalConfig.debug ? console.debug("serBusiness", this) : undefined;
    }
}