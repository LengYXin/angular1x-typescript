import { serHelper, serBusiness, Permissions } from '../../service';
import member from './son/member';
import organization from './son/organization';
import reportform from './son/reportform';
/**
 * 经理中心
 */
export default class controllers extends Permissions {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'thisPermissions'];
    //路由参数
    static $stateParams = [];
    //     //配置  Views 视图
    //     static $views: { [name: string]: ng.ui.IState } = {
    //         "mg-member@mg": { templateUrl: "templates/mg/son/member.tpl.html", controller: member, controllerAs: 'svm' },
    //         "mg-organization@mg": { templateUrl: "templates/mg/son/organization.tpl.html", controller: organization, controllerAs: 'svm' },
    //         "mg-reportform@mg": { templateUrl: "templates/mg/son/reportform.tpl.html", controller: reportform, controllerAs: 'svm' },
    // };
    //手动配置路由
    static $IState: ng.ui.IState[] = [
        { name: "mg", url: "/mg", controller: "mg", controllerAs: "vm", templateUrl: "templates/mg/mg.tpl.html" },
        { name: "mg.member", url: "/member", templateUrl: "templates/mg/son/member.tpl.html", controller: member, controllerAs: 'svm' },
        { name: "mg.organization", url: "/organization/:id", templateUrl: "templates/mg/son/organization.tpl.html", controller: organization, controllerAs: 'svm' },
        { name: "mg.reportform", url: "/reportform", templateUrl: "templates/mg/son/reportform.tpl.html", controller: reportform, controllerAs: 'svm' },
    ];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public thisPermissions: any,
    ) {
        super(serHelper, thisPermissions);
        console.debug("MG控制器", this);
    }

}
