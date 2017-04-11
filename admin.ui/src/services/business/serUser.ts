
import { serHelper } from '../../service';
import * as GlobalConfig from '../../config';

export default class {
    static $inject = ['serHelper'];
    constructor(
        private serHelper: serHelper,
    ) {

    }
    //菜单列表 使用 object 类型 数据被保存到内存中 将 菜单列表的 Menus 指向 Menus即可
    Menus: { list: any[] } = { list: [] };
    //用户上下文
    UserContext: {
        MenuAuths?: any,
        MenuTree?: any[],
        Roles?: any,
        UserInfo?: {
            UserId: number,
            UserCode: string,
            UserName: string,
            UserNameEn: string,
            Email: string,
            Enabled: boolean,
            Mobile: string,
            BizType: string,
            BizId: number,
            Roles: any,
        }
    } = {};
    //处理用户菜单 
    // HandleUserMenuList(r) {
    //     try {
    //         this.Menus.list = r;
    //         this.Menus.list = this.Menus.list.concat(Menus);
    //     } catch (error) {
    //         this.Menus.list = Menus;
    //     }
    //     //执行 移植的js代码
    //     // setTimeout(function () {
    //     //     window["samAdminLoad"]();
    //     // }, 500);
    // }
    Login(uid: string, pwd: string) {
        this.serHelper.serHTTP.post("sys/login", { uid: uid, pwd: pwd }).success(r => {
            this.serHelper.$cookies.put('sso-token', r.Token.tk);
            window.location.href = "/index.html";
        }).error(e => {
            //todo:?
        });
    }
    //获取用户数据处理 逻辑
    GetUserContext(Callback) {
        if (window.location.pathname != "/login.html" && !this.serHelper.$cookies.get('sso-token')) window.location.pathname = "/login.html";

        this.serHelper.serHTTP.get("sys/UserContext").success(r => {
            this.UserContext = r;
            // this.HandleUserMenuList(this.UserContext.MenuTree);
            // if (GlobalConfig.debug ) {
            console.debug('UserContext', this.UserContext);
            // }
            Callback ? Callback() : undefined;
            this.serHelper.$rootScope.$broadcast("GetUserContextSuccess", this.UserContext);
        }).error(e => {
            console.log(e);
            // this.HandleUserMenuList(this.UserContext.MenuTree);

            // if (window.location.pathname != "/login.html") window.location.href = "/login.html";
        });
    }
    Logout() {
        this.serHelper.serHTTP.post("/sys/logout", {}).success(r => {
            this.serHelper.$cookies.remove('sso-token');
            window.location.href = "/login.html";
        }).error(e => {
            console.error(e);
        });
    }
    Refresh() {
        this.serHelper.serHTTP.post("/sys/refresh", {}).success(r => {
            window.location.href = "/index.html";
        });
    }
}