import { serHelper, serBusiness, articleReview } from '../../service';

/**
 * 内推宝典详情
 */
export default class controllers extends articleReview {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = ["id"];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        super($scope, serHelper, serBusiness);
        this.init();
        console.log(this);
    }
    //details = this.serBusiness.serApi.activity.queryById;
    details  = this.serBusiness.serApi.push.findById;
}
