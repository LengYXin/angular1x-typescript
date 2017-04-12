import { serHelper, serBusiness } from '../../service';

/**
 * 首页控制器
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
    //路由参数
    static $stateParams = [];
    //配置  Views 视图
    static $views: { [name: string]: ng.ui.IState } = {
        "userinfo@personal": { templateUrl: "templates/personal/userinfo/userinfo.tpl.html", controller: "personal/basic", controllerAs: 'svm' },
        "basic@personal": { templateUrl: "templates/home/page1.tpl.html", controller: "home/page1", controllerAs: 'svm' },
        "position@personal": { templateUrl: "templates/home/page2.tpl.html", controller: "home/page2", controllerAs: 'svm' }
    };
    HomeData = {
        Test: "我是 父控制器 Personal数据"
    };
 
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {
        console.debug("Personal控制器", this);
    }
  
}
