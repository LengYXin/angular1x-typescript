/**
 * 监控服务
 */
import * as GlobalConfig from './config';

export default class {
    constructor(
        private $rootScope: ng.IRootScopeService,
    ) {
        this.$rootScope.$on("pageFinishedLoading", (e, x) => {
            this.$rootScope.$pageFinishedLoading = true;
            this.nav = $("body>.nav-left .nav-sidebar");
        });
        //路由监控
        this.$rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
            this.stateChangeSuccess(event, toState, toParams, fromState, fromParams);
        });
    }
    //处理菜单 dom 样式
    nav: JQuery;
    toState: ng.ui.IState = null;
    navActiveCount = 10;
    navActive(name) {
        // console.log(name);
        if (name == "public") {
            name = "home";
        }
        if (this.navActiveCount < 1) {
            return;
        }
        if (this.nav) {
            let dom = this.nav.find(`[data-sref-active|=${name}]`);
            if (dom.length) {
                this.nav.find(`[data-sref-active]`).removeClass("active");
                dom.addClass("active");
            }
            this.navActiveCount = 10;
        }
        else {
            this.navActiveCount--;
            setTimeout(() => {
                this.navActive(name);
            }, 500);
        }
    };
    //监控路由器变化
    stateChangeSuccess(event, toState: ng.ui.IState, toParams, fromState, fromParams) {
        //滚动条返回顶部
        try {
            $("body>.container-body").scrollTop(0);
            if (toState.name.indexOf(".") == -1 && toState.name.indexOf("/") == -1) {
                this.navActive(toState.name);
            } else {
                if (toState.name.indexOf(".") != -1) {
                    this.navActive(toState.name.split(".")[0]);
                }
                if (toState.name.indexOf("/") != -1) {
                    this.navActive(toState.name.split("/")[0]);
                }
            }
        } catch (error) {
            console.error("stateChangeSuccess", error);
        }


        //保存当前路由参数
        // this.toState = toState;
        // if (toState.resolve.thisPermissions().indexOf("See") == -1) {
        //     toState.templateUrl = "templates/error.tpl.html";
        // }
        // console.info("---------------------------------------------");
        // console.info(event);
        // toState.controllerAs="vvvm";
        // console.info(toState);
        // console.info(toParams);
        // console.info(fromState);
        // console.info("---------------------------------------------");

    }
}
