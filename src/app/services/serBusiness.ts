
/**************************************
   ******       serBusiness  业务逻辑服务 综合类
  ************************************/
import * as Allocation from '../Allocation';
import serApi from './business/serApi';
import serUserContext from './business/serUserContext';
import serHelper from "./serHelper";
export default class {
    //服务器类型 默认为 service 
    static $type = Allocation.EnumServicesType.service;
    static $inject = ["serHelper"];
    constructor(
        public serHelper: serHelper,
        // public serApi: serApi,
        // public serUserContext: serUserContext,
    ) {
        // this.$rootScope.$broadcast("pageFinishedLoading", 1);
        Allocation.debug ? console.debug("serBusiness", this) : undefined;
    }
    serApi = new serApi(this.serHelper)
    serUserContext = new serUserContext(this.serHelper)
}