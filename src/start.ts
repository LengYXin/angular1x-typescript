import * as angular from 'angular';
import * as Allocation from './app/Allocation';
import app from "./app/index"
/**
 * ng 启动文件
 */
export default class {
    //angular 模块
    starter: ng.IModule;
    /**
     * 构造函数
     * @param requires 附加导入模块
     */
    constructor(requires?: string[]) {
        console.info("app 所有模块信息", app);
        //默认导入模块
        let requiresStarter = [
            'ui.router',
            'ngImgCrop',
            'ngAnimate',
            'chieffancypants.loadingBar',
            'toastr',
            'ngDialog',
            'ngCookies',
            'ngFileUpload',
            'ngSanitize',
            // "angucomplete-alt",
        ];
        if (requires)
            requiresStarter = requiresStarter.concat(requires);
        this.starter = angular.module('starter', requiresStarter);
        this.start();
    }
    //初始化 
    start() {
        this.bootstrap();
    }
    //启动程序入口
    bootstrap() {
        this.injectServices(app.services);
        this.injectFilters(app.filters);
        this.injectDirective(app.directives);
        this.injectComponent(app.components);
        this.starter.run(['serHelper', 'serBusiness', '$uiRouter', (serHelper, serBusiness, $uiRouter) => {
            serHelper.$rootScope.loadTest = "如果您看到这条信息就说明代码运行成功！";
            serHelper.$rootScope.$urlRouter = this.urlRouter;
            console.log("serHelper", serHelper);
            console.log("serBusiness", serBusiness);
            // d3 路由视图
            if (window['ui-router-visualizer']) {
                window['ui-router-visualizer'].visualizer($uiRouter);
            }
        }]);

        this.starter.config([
            '$stateProvider',
            '$urlRouterProvider',
            '$httpProvider',
            'toastrConfig',
            'cfpLoadingBarProvider',
            // '$translateProvider',
            (
                $stateProvider: ng.ui.IStateProvider,
                $urlRouterProvider: ng.ui.IUrlRouterProvider,
                $httpProvider: ng.IHttpProvider,
                toastrConfig,
                cfpLoadingBarProvider,
            ) => {
                //$http拦截注入
                // $httpProvider.interceptors.push('serHttpInterceptor');
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
                // new route($stateProvider, $urlRouterProvider);
                this.urlRouter.map(x => {
                    $stateProvider.state(x);
                });
                $urlRouterProvider.otherwise('/');
            }
        ]);
        angular.bootstrap(document, ['starter']);
    }
    urlRouter: ng.ui.IState[] = [];
    /**
     * 生成路由 （这里是控制器模式  组件模式 查看文档）
     * https://ui-router.github.io/ng1/tutorial/hellosolarsystem
     * 组件配置 https://ui-router.github.io/guide/ng1/route-to-component
     * @param Component 模块 || 控制器
     */
    createRouter(Component: { Key: string, Route: string, Value: any }) {
        let Router: ng.ui.IState = {};
        // 路由名称 先看控制器 是否配置名称 没有配置使用 自动生成的 Route 为名称
        Router.name = Component.Value.$Name || Component.Route;
        // 路径 也是以 控制器配置的优先大于 生成
        Router.url = "/" + (Component.Value.$Url || Component.Route);
        // 模板，模块中导入 的 html 文件
        Router.template = Component.Value.$Template || `
        <div>
            <h1>当前路由没有配置模板</h1>
            <p ng-bind="vm.$resolve.$state$"></p>
        <div>
        `;
        // 视图
        Router.views = Component.Value.$Views;
        //控制器
        Router.controller = Component.Value;
        // 重命名 控制器  默认 $ctrl
        Router.controllerAs = "vm";

        this.urlRouter.push(Router);
    }
    /**
     * 注入组件 （包括控制器==）
     */
    injectComponent(Components) {
        for (var key in Components) {
            if (Components.hasOwnProperty(key)) {
                var element = Components[key];
                if (element.Key && element.Route) {
                    this.createRouter(element);
                }
                // this.starter.service(key, element);
            }
        }
        console.log("urlRouter", this.urlRouter);
    }
    /**
     * 注入指令
     */
    injectDirective(Directives) {
        // let clgtate = {};
        // directives.forEach(x => {
        //     this.starter.directive(x.name, x.val);
        //     clgtate[x.name] = x;
        // });
        // GlobalConfig.debug ? console.debug(" directive 成功", clgtate) : undefined;

    }
    /**
    * 注入指令
    */
    injectFilters(Filters) {
        // let clgtate = {};
        // filters.forEach(x => {
        //     this.starter.filter(x.name, x.val);
        //     clgtate[x.name] = x;
        // });
        // GlobalConfig.debug ? console.debug("filter 成功", clgtate) : undefined;

    }
    /**
   * 注入服务
   */
    injectServices(services) {
        for (var key in services) {
            if (services.hasOwnProperty(key)) {
                var element = services[key];
                // console.log(key);
                // console.dir(element);
                // switch (element.$type) {
                //     case Allocation.EnumServicesType.service:
                //         this.starter.service(key, element);
                //         break;
                //     // case GlobalConfig.EnumServicesType.factory:
                //     //     this.starter.factory(x.name, <any>x.val);
                //     //     break;
                //     // case GlobalConfig.EnumServicesType.provider:
                //     //     this.starter.provider(x.name, <any>x.val);
                //     //     break;
                //     default:
                this.starter.service(key, element);
                //         break;
                // }
            }
        }
    }
}
