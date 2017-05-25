import { serHelper, serBusiness } from '../../service';

/**
 * 鑫知识库
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
        this.item = this.serBusiness.serApi.knowledge.articlelist;
        console.log(this.item);
    }
    item;

}
