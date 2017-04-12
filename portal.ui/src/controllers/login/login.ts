import * as GlobalConfig from '../../config';

/**
 * 登录控制器
 */
export default class controllers {
    //angular 注入   
    static $inject = [];
    //路由参数
    static $stateParams = [];
    //手动配置 路由  
    static $IState: ng.ui.IState = {
        controllerAs: "vm",
        controller: "login",
        name: "loginTest",
        templateUrl: "templates/login/login.tpl.html",
        url: "/login/login",
    };
    constructor() {
        console.debug("Login控制器");
    }
    config = GlobalConfig;
    uid: string = "";
    pwd: string = "";
    Login() {
        console.log("Login", this);
        // console.log("Login", this.pwd);
        // this.serBusiness.serUser.Login(this.uid, this.pwd);
    }
    switch_host() {
        // this.serHelper.serHTTP.switch_host();
    }
}
