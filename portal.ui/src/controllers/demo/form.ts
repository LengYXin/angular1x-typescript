import { serHelper, serBusiness } from '../../service';

/**
 * 首页控制器
 */
//export let controllersName: string = "DomeForme";
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
     //路由参数
    static $stateParams = [];
    dateTime: string = "";
    dateTime2: string = "";
    dateTime3: string = "";
    datetimepicker = {
        timepicker: false
    };
    datetimepicker2 = {};
    datetimepicker3 = {
        datepicker: false,
        step: 5
    };
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {

    }
    console() {
        console.log(this.dateTime);
        console.log(this.dateTime2);
        console.log(this.dateTime3);
    }
}
