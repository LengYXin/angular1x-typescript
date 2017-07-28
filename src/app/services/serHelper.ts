
/**************************************
   ******       serHelper  所有 全局单列 自定义服务 综合类
  ************************************/
import * as Allocation from '../Allocation';
import * as DecoratorFactory from '../DecoratorFactory';

// import serHttpInterceptor from './serHttpInterceptor';
import serHTTP from './helper/serHTTP';
// import serStorage from './serStorage';
// import serSession from './serSession';
import serQiniu from './helper/serQiniu';
// @DecoratorFactory.service()
export default class {
    //服务器类型 默认为 service 
    static $type = Allocation.EnumServicesType.service;
    static $inject = [
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$q',
        '$timeout',
        '$filter',
        '$cookies',
        'Upload',
        'ngDialog',
        'cfpLoadingBar',
        'toastr',
        // 'serStorage',
        // 'serSession',
        // 'serHTTP',
        // 'serQiniu'
    ];
    constructor(
        public $rootScope: ng.IRootScopeService,
        public $state: ng.ui.IStateService,
        public $stateParams: ng.ui.IStateParamsService,
        public $http: ng.IHttpService,
        public $q: ng.IQService,
        public $timeout: ng.ITimeoutService,
        public $filter: ng.IFilterService,
        public $cookies: any,
        public Upload: any,
        public ngDialog: any,
        public cfpLoadingBar: any,
        public toastr: { success: any, info: any, warning: any, error: any },
        // public serStorage: serStorage,
        // public serSession: serSession,
        // public serHTTP: serHTTP,
        // public serQiniu: serQiniu,

    ) {
        this.$timeout(() => {
            this.$rootScope.$broadcast("pageFinishedLoading", 1);
        }, 500);
        Allocation.debug ? console.debug("serHelper", this) : undefined;
    }
    serHTTP = new serHTTP(this.$http, this.toastr, this.cfpLoadingBar, this.$cookies, this.$q)
    serQiniu = new serQiniu(this.$q)
}

