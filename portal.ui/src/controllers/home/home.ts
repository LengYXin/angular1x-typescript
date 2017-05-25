import { serHelper, serBusiness } from '../../service';
import notice from './son/notice';
import culture from './son/culture';
import teamProfile from './son/teamProfile';
import calendar from './son/calendar';



/**
 * 首页控制器
 */

export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    //配置  Views 视图
    static $views: { [name: string]: ng.ui.IState } = {
        "teamProfile@home": { templateUrl: "templates/home/son/team-profile.tpl.html", controller: teamProfile, controllerAs: 'svm' },
        "calendar@home": { templateUrl: "templates/home/son/calendar.tpl.html", controller: calendar, controllerAs: 'svm' },
        // "notice@home": { templateUrl: "templates/home/page/notice.tpl.html", controller: notice, controllerAs: 'svm' },
        // "culture@home": { templateUrl: "templates/home/page/culture.tpl.html", controller: culture, controllerAs: 'svm' }
    };
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,
    ) {
        this.init();
    };
    quickway;
    friendlink;
    workCounts;
    notice;
    culture;
    guide;
    init() {
        this.quickway = this.serBusiness.serApi.basekv.quickway;
        this.friendlink = this.serBusiness.serApi.basekv.friendlink;
        this.workCounts = this.serBusiness.serApi.apply.workCounts;
        this.notice = this.serBusiness.serApi.notice.homeQueryAll;
        this.culture = this.serBusiness.serApi.culture.last;
        this.guide = this.serBusiness.serApi.notice.findGuide("guide");
        
    }
}
