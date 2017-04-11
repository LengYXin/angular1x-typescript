import { modularList } from './controllers/modular';
import * as GlobalConfig from './config';             //全局配置

/**
 * 路由
 */
export default class route {
    constructor(
        private $stateProvider: ng.ui.IStateProvider,
        private $urlRouterProvider: ng.ui.IUrlRouterProvider,
    ) {
        let pathname = window.location.pathname;
        this.pathname = pathname.substr(pathname.lastIndexOf('/'), pathname.length);
        modularList.forEach(x => {
            //手动路由
            if (x.val.$IState) {
                this.ruleTwo(x);
            }
            //自动路由
            else {
                this.ruleOne(x);
            }

        });
        // $urlRouterProvider.otherwise('');
        this.otherwise();
        GlobalConfig.debug ? console.debug('路由列表 -- ' + this.pathname, this.clgtate) : undefined;
    }
    noRouteUrls = ["/login.html"]
    pathname: string;
    views = [];
    clgtate = {};
    /**
     * 第一种路由方案  根据 控制器结构自动生成
     * @param cls  /controllers/modular.ts   modularList
     */
    ruleOne(cls: yxInterface.ControllerModular) {
        if (this.noRouteUrls.indexOf(this.pathname) != -1) {
            return;
        }
        let url = ["index", "home"].indexOf(cls.name.toLowerCase()) != -1 || cls.name.indexOf('/') == -1 ? `/${cls.name}` : `/${cls.url}`;
        // debugger
        // 参数 
        if (cls.val.$stateParams) {
            cls.val.$stateParams.forEach(x => {
                url += `/{${x}}`;
            });
        }


        let tpl = `templates/${cls.url}.tpl.html`;
        let cfg: ng.ui.IState = { url: url, templateUrl: tpl, controller: cls.name, controllerAs: 'vm' };
        /**
         * 检查是否有配置子视图（ui-view） 如果配置了子视图，将子视图加入到配置中
         */
        if (cls.val.$views) {
            //子视图
            cfg.views = cls.val.$views;
            //             for (var key in cfg.views) {
            //                 if (cfg.views.hasOwnProperty(key)) {
            //                     var e = cfg.views[key];
            // console.log(e);
            //                 }
            //             }
            //这里需要把 自己导入进来 因为 $stateProvider.state 如果配置了 view 跟的控制器 是不会被实力化的。
            cfg.views[''] = { templateUrl: tpl, controller: cls.name, controllerAs: 'vm' };
        }
        this.$stateProvider.state(cls.name, cfg)
        this.clgtate[cls.name + (cls.val.$views ? "  --- 此路由为为父配置（控制器 $views） " : "")] = cfg;
    }
    /**
     * 第二种路由方案  根据控制器中的 $IState 手动配置
     * @param cls  /controllers/modular.ts   modularList
     */
    ruleTwo(cls: yxInterface.ControllerModular) {
        if (this.noRouteUrls.indexOf(this.pathname) != -1) {
            return;
        }
        this.$stateProvider.state(cls.val.$IState)
        this.clgtate[cls.val.$IState.name + " --- 此路由为手动配置（控制器 $IState）"] = cls.val.$IState;
    }
    otherwise() {
        switch (this.pathname) {
            case "/index.html":
                this.$urlRouterProvider.otherwise('/home');
                break;
            default:
                this.$urlRouterProvider.otherwise('/home');
                break;
        }
    }
}
