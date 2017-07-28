
import serHelper from '../serHelper';

import * as Allocation from '../../Allocation';

export default class {
    // static $inject = ['serHelper', '$menuPermissions'];
    constructor(
        private serHelper: serHelper,
        // private $menuPermissions: any,
    ) {
        // this.serHelper.serHTTP.get("user/refreshContext");
    }
    //用户上下文
    UserContext: any = {};
    //处理用户菜单  废弃
    HandleUserMenuList() {
        // let list = [];
        // this.$menuPermissions.list.forEach(x => {
        //     let role = false;
        //     if (x.role && x.role.length > 0) {
        //         this.UserContext.role.forEach(y => {
        //             if (role) return;
        //             if (x.role.indexOf(y) != -1) role = true;
        //         });
        //         if (role) list.push(x);
        //     } else {
        //         list.push(x);
        //     }
        // });
        // this.$menuPermissions.list = list;
        // // 处理好菜单 通知 页面加载完成
        // this.serHelper.$timeout(x => {
        //     this.serHelper.$rootScope.$broadcast("pageFinishedLoading", 1);
        // }, 1000);
    }
    Login(uid: string, pwd: string) {
        
        this.serHelper.serHTTP.postIPromise("sys/login", { uid: uid, pwd: pwd }).then(r => {
        // this.serHelper.serHTTP.getIPromise("sys/login", { params: { uid: uid, pwd: pwd } }).then(r => {
            // this.serHelper.serStorage.set('sso-user', r);
            // if (window.location.search.indexOf("?jumpto=") >= 0) {
            //     var href = window.location.href.indexOf("?jumpto=");
            //     window.location.href = window.location.href.substr(href+8);
            // } else {
            window.location.href = "index.html";
            // }
        }).catch(e => {
            //todo:?
            console.log("eeee", e);
        });
    }
    //获取用户数据处理 逻辑
    GetUserContext(Callback) {
        // if (window.location.pathname != "/login.html" && !this.serHelper.$cookies.get('sso-token')) window.location.pathname = "/login.html";

        // this.serHelper.serHTTP.getIPromise("user/refreshContext").then(r => {


        // let r: any = (<any>Object).assign({}, window["HRPortalData"].ngRootUserContext);//复制
        let r: any = jQuery.extend(true, {}, window["HRPortalData"].ngRootUserContext);//复制

        // r.role = [];
        // // if (r.mq == 'Y') {
        //     r.role.push("mq");
        // // }
        // // if (r.hr == 'Y') {
        //     r.role.push("hr");
        // // }
        this.serHelper.$rootScope.$rootUserContext = this.UserContext = r;
        //处理菜单
        this.HandleUserMenuList();
        // if (GlobalConfig.debug ) {
        // console.debug('UserContext', this.UserContext);
        // }
        // Callback ? Callback() : undefined;
        this.serHelper.$rootScope.$broadcast("GetUserContextSuccess", this.UserContext);
        // }).catch(e => {
        //     window.location.href = "login.html";
        // });
    }
    Logout() {
        // this.serHelper.serHTTP.postIPromise("/sys/logout", {}).success(r => {
        //     this.serHelper.$cookies.remove('x-session-token');
        //     window.location.href = "login.html";
        // }).error(e => {
        //     console.error(e);
        // });
    }

}