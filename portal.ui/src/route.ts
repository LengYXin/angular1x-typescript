import { modularList } from './controllers/modular';
import * as GlobalConfig from './config';             //全局配置

/**
 * 路由
 */
export default class route {
    //不需要生成路由的页面
    noRouteUrls = ["/login.html"];
    // 当前html文档名
    pathname: string;
    // 输出到控制器的查看使用
    clgtate = {};
    constructor(
        private $stateProvider: ng.ui.IStateProvider,
        private $urlRouterProvider: ng.ui.IUrlRouterProvider,
        private $menuPermissions?: any,
    ) {
        let pathname = window.location.pathname;
        this.pathname = pathname.substr(pathname.lastIndexOf('/'), pathname.length);
        // 跳过指定的文档
        if (this.noRouteUrls.indexOf(this.pathname) == -1) {
            // 逐个判断控制器配置 根据控制器的配置选项 注册不用的路由
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
        }
        // $urlRouterProvider.otherwise('');
        this.otherwise();
        !GlobalConfig.debug ? console.debug('路由列表 -- ' + this.pathname, this.clgtate) : undefined;
    }

    /**
     * 第一种路由方案  根据 控制器结构自动生成
     * @param cls  /controllers/modular.ts   modularList
     */
    ruleOne(cls: yxInterface.IControllerModular) {

        // let url = ["index", "home"].indexOf(cls.name.toLowerCase()) != -1 || cls.name.indexOf('/') == -1 ? `/${cls.name}` : `/${cls.url}`;
        let url = `/${cls.name}`;

        // debugger
        // 参数 
        if (cls.val.$stateParams) {
            cls.val.$stateParams.forEach(x => {
                url += `/:${x}`;
            });
        }


        let tpl = `templates/${cls.url}.tpl.html`;
        let cfg: ng.ui.IState = { name: cls.name, url: url, templateUrl: tpl, controller: cls.name, controllerAs: 'vm' };
        this.resolve(cfg);
        /**
         * 检查是否有配置子视图（ui-view） 如果配置了子视图，将子视图加入到配置中
         */
        if (cls.val.$views) {
            //子视图
            cfg.views = cls.val.$views;
            //这里需要把 自己导入进来 因为 $stateProvider.state 如果配置了 view 跟的控制器 是不会被实力化的。
            cfg.views[''] = { templateUrl: tpl, controller: cls.name, controllerAs: 'vm' };
        }

        this.$stateProvider.state(cfg)
        this.clgtate[cls.name + (cls.val.$views ? "  --- 此路由为为父配置（控制器 $views） " : "")] = cfg;
    }
    /**
     * 第二种路由方案  根据控制器中的 $IState 手动配置
     * @param cls  /controllers/modular.ts   modularList
     */
    ruleTwo(cls: yxInterface.IControllerModular) {
        if (this.noRouteUrls.indexOf(this.pathname) != -1) {
            return;
        }
        cls.val.$IState.forEach(x => {
            this.resolve(x);
            this.$stateProvider.state(x);
            this.clgtate[x.name + " --- 此路由为手动配置（控制器 $IState）"] = x;
        });
    }
    /**
     *  预先载入控制器所需要的权限
     */
    resolve(cfg: ng.ui.IState) {
        if (this.$menuPermissions) {
            cfg.resolve = {
                thisPermissions: () => {
                    // console.info("注册 控制器权限");
                    let piss;
                    try {
                        this.$menuPermissions.forEach(x => {
                            // console.log("注入权限", cfg.name, x.MenuUrl);
                            if (x.role && x.role.length > 0) {

                                // 如果路由是 xx.xxx 这种格式，说明是抽象路由，注入权限  跳过子 路径
                                if (x.MenuUrl.indexOf('.') != -1) {
                                    let surl = x.MenuUrl.split('.');
                                    surl.forEach(surlx => {
                                        if (cfg.name == surlx) {
                                            console.info(`注入权限 ${cfg.name} ---${x.role.toString()}`);
                                            piss = x.role;
                                        }
                                    });
                                } else {
                                    // 当前路由注入 权限
                                    if (cfg.name == x.MenuUrl) {
                                        console.info(`注入权限 ${cfg.name} ---${x.role.toString()}`);
                                        piss = x.role;
                                    }
                                }
                                //包括子路由也可以进入
                                if (cfg.name != x.MenuUrl && cfg.name.indexOf(x.MenuUrl + "/") != -1) {
                                    console.info(`注入权限 ${cfg.name} ---${x.role.toString()}`);
                                    piss = x.role;
                                }
                            }
                        });
                    } catch (error) {
                        console.error(error);
                    }
                    finally {
                        return piss;
                    }
                },
            };
        }
    };

    otherwise() {
        switch (this.pathname) {
            case "/index.html":
                this.$urlRouterProvider.otherwise('/home');
                break;
            case "/login.html":

                break;
            default:
                this.$urlRouterProvider.otherwise('/home');
                break;
        }
    }
}
