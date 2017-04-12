import { serHelper, serBusiness } from '../../service';

/**
 * 首页控制器
 */
// export let controllersName: string = "DomeDialog";
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {
        console.log("basic 控制器",this);
    }
    test: string = "哈哈哈 我是测试的 basic"

}
