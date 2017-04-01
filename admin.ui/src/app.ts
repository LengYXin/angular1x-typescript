//检查 ng 是否可用  ie8 是 不行的
if (angular.module) {

} else {
    alert("你的浏览器太落后了，做对应的处理");
}
import './css';                     //自定义css模块
import * as GlobalConfig from './config';             //全局配置
import * as service from "./service";                 //服务
import * as directive from "./directive";             //指令
import * as filter from "./filter";                   //过滤器
import * as controller from "./controller";           //各个业务模块的控制器和配合项
import route from "./route";           //各个业务模块的控制器和配合项
let starter = angular.module('starter', [
    'ui.router',
    'ngAnimate',
    'chieffancypants.loadingBar',
    'toastr',
    'ngDialog',
    'ngCookies',
    controller.moduleName,
    service.moduleName,
    directive.moduleName,
    filter.moduleName,
]);
starter.run(['$rootScope', function ($rootScope) {
 
}]);

starter.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    'toastrConfig',
    'cfpLoadingBarProvider',
    // '$translateProvider',
    function (
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $httpProvider: ng.IHttpProvider,
        toastrConfig,
        cfpLoadingBarProvider,
        // $translateProvider
    ) {
        //$http拦截注入
        $httpProvider.interceptors.push('serHttpInterceptor');
        //提示框
        // angular.extend(toastrConfig, {
        //     allowHtml: true,
        //     closeButton: true,
        //     closeHtml: '<button>&times;</button>',
        //     extendedTimeOut: 1000,
        //     iconClasses: {
        //         error: 'toast-error',
        //         info: 'toast-info',
        //         success: 'toast-success',
        //         warning: 'toast-warning'
        //     },
        //     messageClass: 'toast-message',
        //     onHidden: null,
        //     onShown: null,
        //     onTap: null,
        //     progressBar: true,
        //     tapToDismiss: true,
        //     timeOut: 100,
        //     titleClass: 'toast-title',
        //     toastClass: 'toast',
        //     positionClass: 'toast-top-full-width'
        // });
        new route($stateProvider, $urlRouterProvider);
    }
]);

//启动 
angular.bootstrap(document, ['starter']);