import { serHelper, serBusiness } from '../../service';
import myinfo from './son/myinfo';
import mysalary from './son/mysalary';
import mypush from './son/mypush';
import myapply from './son/myapply';
import myhandle from './son/myhandle';
import applyDetails from './son/applydetails';

/**
 * 首页控制器
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper','serBusiness'];
    //路由参数
    static $stateParams = [];
    //手动配置路由
    static $IState: ng.ui.IState[] = [
        { name: "user", url: "/user", controller: "user", controllerAs: "vm", templateUrl: "templates/user/user.tpl.html" },
        { name: "user.myinfo", url: "/myinfo", controller: myinfo, controllerAs: "svm", templateUrl: "templates/user/myinfo/myinfo.tpl.html" },
        { name: "user.mysalary", url: "/mysalary", controller: mysalary, controllerAs: "svm", templateUrl: "templates/user/mysalary/mysalary.tpl.html" },
        { name: "user.mypush", url: "/mypush", controller: mypush, controllerAs: "svm", templateUrl: "templates/user/mypush/mypush.tpl.html" },
        { name: "user.myapply", url: "/myapply", controller: myapply, controllerAs: "svm", templateUrl: "templates/user/myapply/myapply.tpl.html" },
        { name: "user.myhandle", url: "/myhandle", controller: myhandle, controllerAs: "svm", templateUrl: "templates/user/myapply/myhandle.tpl.html" },
        { name: "user.myhandle/entry", url: "/myhandle/:id", controller: myhandle, controllerAs: "svm", templateUrl: "templates/user/myapply/myhandle-entry.tpl.html" },

        //申请和待办 详情
        //{ name: "applydetails", url: "/myhandle/:id", controller: applydetails, controllerAs: "svm", templateUrl: "templates/user/myapply/applydetails.tpl.html" },

 ];

    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness:serBusiness
    ) {
        console.debug("user控制器", this);
    }
}
