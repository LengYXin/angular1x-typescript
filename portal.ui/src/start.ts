import './css';                     //自定义css模块
// import './baseClass/calendar.js';  //日历
import * as GlobalConfig from './config';             //全局配置
import { modularList as controllers } from './controllers/modular';
import { modularList as directives } from './directives/modular';
import { modularList as filters } from './filters/modular';
import { modularList as services } from './services/modular';
import route from "./route";           //各个业务模块的控制器和配合项
import monitor from "./monitor";       //监控
/**
 * ng 启动文件
 */
export default class {
    //angular 模块
    starter: ng.IModule;
    //权限
    $menuPermissions: any[];
    //页面路径
    pathname: any;
    /**
     * 构造函数
     * @param requires 附加导入模块
     */
    constructor(requires?: string[]) {
        let pathname = window.location.pathname;
        this.pathname = pathname.substr(pathname.lastIndexOf('/'), pathname.length);
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
            "angucomplete-alt",
        ];
        if (requires) {
            requires.forEach(x => {
                requiresStarter.push(x);
            });
        }
        this.starter = angular.module('starter', requiresStarter);

        this.start();

    }
    //初始化 
    start() {
        if (this.pathname == "/login.html") {
            //注册一个 空的 权限服务 为了防止 控制器调用报错  
            services.push({
                name: "$menuPermissions", val:
                class {
                    list = [];
                }
            });
            this.bootstrap();
        } else {
            //获取到 菜单 后启动 程序
            jQuery.ajax("assets/json/menus.json", {
                success: x => {
                    this.$menuPermissions = x;
                    //注册一个 权限服务
                    services.push({
                        name: "$menuPermissions", val:
                        class {
                            list = x;
                        }
                    });
                    this.bootstrap(this.$menuPermissions);
                },
                error: x => {
                    // this.bootstrap();
                    console.error(x);
                }
            })
        }
    }
    //启动程序入口
    bootstrap($menuPermissions?) {
        this.injectServices();
        this.injectFilters();
        this.injectDirective();
        this.injectController();
        this.starter.run(['$rootScope', '$menuPermissions', 'serUserContext', ($rootScope, $menuPermissions, serUserContext) => {
            new monitor($rootScope);
            if (this.pathname == "/login.html") {
            } else {
                serUserContext.GetUserContext();
            };
        }]);

        this.starter.config([
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
                new route($stateProvider, $urlRouterProvider, $menuPermissions);
            }
        ]);
        angular.bootstrap(document, ['starter']);
    }

    /**
     * 注入控制器
     */
    injectController() {
        let clgtate = {};
        controllers.forEach(x => {
            try {
                this.starter.controller(x.name, <Function>x.val);
                clgtate[x.name] = x;
            } catch (error) {
                console.error("controllers", error);
            }
        });

        GlobalConfig.debug ? console.debug("controllers 成功", clgtate) : undefined;

    }
    /**
     * 注入指令
     */
    injectDirective() {
        let clgtate = {};
        directives.forEach(x => {
            this.starter.directive(x.name, x.val);
            clgtate[x.name] = x;
        });
        GlobalConfig.debug ? console.debug(" directive 成功", clgtate) : undefined;

    }
    /**
    * 注入指令
    */
    injectFilters() {
        let clgtate = {};
        filters.forEach(x => {
            this.starter.filter(x.name, x.val);
            clgtate[x.name] = x;
        });
        GlobalConfig.debug ? console.debug("filter 成功", clgtate) : undefined;

    }
    /**
   * 注入服务
   */
    injectServices() {
        let clgtate = {};
        services.forEach(x => {
            switch (x.val.$type) {
                case GlobalConfig.EnumServicesType.service:
                    this.starter.service(x.name, <any>x.val);
                    break;
                // case GlobalConfig.EnumServicesType.factory:
                //     this.starter.factory(x.name, <any>x.val);
                //     break;
                // case GlobalConfig.EnumServicesType.provider:
                //     this.starter.provider(x.name, <any>x.val);
                //     break;
                default:
                    this.starter.service(x.name, <any>x.val);
                    break;
            }
            clgtate[x.name] = x;
        });
        GlobalConfig.debug ? console.debug("services 成功", clgtate) : undefined;

    }
}
