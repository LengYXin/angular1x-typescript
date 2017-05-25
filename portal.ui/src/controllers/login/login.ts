import * as GlobalConfig from '../../config';
import { serHelper, serBusiness } from '../../service';

/**
 * 登录控制器
 */
export default class controllers {
    //angular 注入   
    static $inject = ['serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    //手动配置 路由  
    // static $IState: ng.ui.IState = {
    //     controllerAs: "vm",
    //     controller: "login",
    //     name: "loginTest",
    //     templateUrl: "templates/login/login.tpl.html",
    //     url: "/login/login",
    // };
    constructor(
        public serHelper: serHelper,
        public serBusiness: serBusiness,
    ) {
        console.debug("Login控制器");
    }
    config = GlobalConfig;
    uid: string = "hrcs2";
    pwd: string = "111";
    Login() {
        // console.log("Login", this);
        // console.log("Login", this.pwd);
        if (this.uid.length < 1) {
            return this.serHelper.toastr.warning("输入 uid","提示！");
        }
        if (this.pwd.length < 1) {
            return this.serHelper.toastr.warning("输入 pwd","提示！");
        }
        this.serBusiness.serUserContext.Login(this.uid, this.pwd);
    }
    switch_host() {
        // this.serHelper.serHTTP.switch_host();
    }
}
