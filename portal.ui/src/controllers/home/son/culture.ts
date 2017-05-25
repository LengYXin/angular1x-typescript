import { serHelper, serBusiness } from '../../../service';

/**
 * 首页控制器
 */
 
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {
        console.log("page1 控制器",this.$scope.vm);
    }
    test:string="哈哈哈 我是测试的 page1"
}
