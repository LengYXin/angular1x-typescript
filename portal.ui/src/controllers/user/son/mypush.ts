import { serHelper, serBusiness } from '../../../service';

/**
 * 首页控制器
 */
 
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
    //路由参数
    static $stateParams = [];
    dateTime: string = "";
    dateTime2: string = "";
    datetimepicker = {
        timepicker: false
    };
    datetimepicker2 = {timepicker: false};
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {
        console.log("basic 控制器",this);
    }
    rows:any = [1,2,3,4,5];
    test: string = "哈哈哈 我是测试的 basic";

}
