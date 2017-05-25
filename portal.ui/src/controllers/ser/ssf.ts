import { serHelper, serBusiness } from '../../service';

/**
 * 社保公积金
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        console.log(this);
    }
    item = this.serBusiness.serApi.self.findSocial("social");
}
