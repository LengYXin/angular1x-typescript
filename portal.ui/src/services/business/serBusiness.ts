
/**************************************
   ******       serBusiness  业务逻辑服务 综合类
  ************************************/
import * as GlobalConfig from '../../config';
import serApi from './serApi';
import serUserContext from './serUserContext';

export default class {
    //服务器类型 默认为 service 
    static $type = GlobalConfig.EnumServicesType.service;
    static $inject = ['$rootScope', 'serApi', 'serUserContext'];
    constructor(
        public $rootScope: ng.IRootScopeService,
        public serApi: serApi,
        public serUserContext: serUserContext,
    ) {
        // this.$rootScope.$broadcast("pageFinishedLoading", 1);
        GlobalConfig.debug ? console.debug("serBusiness", this) : undefined;
    }
}