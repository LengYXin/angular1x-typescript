import { serHelper, serBusiness } from '../../service';

/**
 * 搜索
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper','serBusiness'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,
        
    ) {
    }
}
