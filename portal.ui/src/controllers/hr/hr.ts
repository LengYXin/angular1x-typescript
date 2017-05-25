import { serHelper, serBusiness, Permissions } from '../../service';
import quit from './son/quit';
import staff from './son/staff';
import reportform from './son/reportform';
/**
 * hr控制器
 */
export default class controllers extends Permissions {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness', 'thisPermissions'];
    //路由参数
    static $stateParams = [];
    //配置  Views 视图
    static $views: { [name: string]: ng.ui.IState } = {
        "hr-quit@hr": { templateUrl: "templates/hr/son/quit.tpl.html", controller: quit, controllerAs: 'svm' },
        "hr-staff@hr": { templateUrl: "templates/hr/son/staff.tpl.html", controller: staff, controllerAs: 'svm' },
        "hr-reportform@hr": { templateUrl: "templates/hr/son/reportform.tpl.html", controller: reportform, controllerAs: 'svm' },
    };
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,
        public thisPermissions: any,

    ) {
        super(serHelper, thisPermissions);

        console.debug("hr控制器", this);
    }

}
