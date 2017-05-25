import { serHelper, serBusiness } from '../../../service';

/**
 * 首页控制器
 */

export default class controllers {
    //angular 注入   
    static $inject = ['$scope', '$element', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public $element: JQuery,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        var options = {
            events_source: null,
            view: 'month',
            tmpl_path: 'assets/tmpls/',
            tmpl_cache: false,
            weekbox: false,
            onAfterEventsLoad: function (e) {
                // console.log("onAfterEventsLoad", e);
            },
            onAfterViewLoad: function (e) {
                // console.log("onAfterViewLoad", e);
            },
        };
        this.serBusiness.serApi.user.calendar().then(x => {
            options.events_source = x;
            this.calendar = this.$element.find('.calendar-body').calendar(options);
        }).catch(x => {
            this.calendar = this.$element.find('.calendar-body').calendar(options);
        });
        let now = new Date();
        this.today = { week: now.getDay(), year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
        //console.info(this.today);
    }
    today: any = {};
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    weeks = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    calendar;
    navigate(t) {
        this.calendar.navigate(t);
    }
}
