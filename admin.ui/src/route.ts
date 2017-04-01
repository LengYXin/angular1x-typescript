import { modularList } from './controllers/modular';

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
        console.debug('路由列表 -- ' + this.pathname, this.clgtate);
    }
    noRouteUrls = ["/login.html"]
    pathname: string;
    clgtate = {};
    /**
     * 第一种路由方案  根据 控制器结构自动生成
     * @param cls  /controllers/modular.ts   modularList
     */
    ruleOne(cls: yxInterface.ControllerModular) {
        if (this.noRouteUrls.indexOf(this.pathname) != -1) {
            return;
        }
        let url = cls.name.toLowerCase() == "index" ? `/${cls.name}` : `/${cls.url}`;
        // debugger
        // 参数 
        if (cls.val.$stateParams) {
            cls.val.$stateParams.forEach(x => {
                url += `/{${x}}`;
            });
        }


        let tpl = `templates/${cls.url}.tpl.html`;
        let cfg = { url: url, templateUrl: tpl, controller: cls.name, controllerAs: 'vm' };

        this.$stateProvider.state(cls.name, cfg)
        this.clgtate[cls.name] = cfg;
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
        this.clgtate[cls.val.$IState.name + " --- 此路由为收到配置（控制器 $IState）"] = cls.val.$IState;
    }
    otherwise() {
        switch (this.pathname) {
            case "/index.html":
                this.$urlRouterProvider.otherwise('/demo/dialog');
                break;
        }
    }
}
