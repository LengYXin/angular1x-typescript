
/**************************************
   ******       serHelper  所有 全局单列 自定义服务 综合类
  ************************************/
import * as GlobalConfig from '../../config';
import serHttpInterceptor from './serHttpInterceptor';
import serHTTP from './serHTTP';
import serStorage from './serStorage';
import serSession from './serSession';
import serQiniu from './serQiniu';

export default class {
    //服务器类型 默认为 service 
    static $type = GlobalConfig.EnumServicesType.service;
    static $inject = [
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$timeout',
        '$cookies',
        'ngDialog',
        'cfpLoadingBar',
        'toastr',
        'serStorage',
        'serSession',
        'serHTTP',
        'serQiniu'
    ];
    constructor(
        public $rootScope: ng.IRootScopeService,
        public $state: ng.ui.IStateService,
        public $stateParams: ng.ui.IStateParamsService,
        public $http: ng.IHttpService,
        public $timeout: ng.ITimeoutService,
        public $cookies: any,
        public ngDialog: any,
        public cfpLoadingBar: any,
        public toastr: any,
        public serStorage: serStorage,
        public serSession: serSession,
        public serHTTP: serHTTP,
        public serQiniu: serQiniu,

    ) {
        GlobalConfig.debug ? console.debug("serHelper", this) : undefined;
        this.$timeout(x => {
            this.$rootScope.$pageFinishedLoading = true;
        });
    }
}
