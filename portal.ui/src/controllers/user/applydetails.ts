import { serHelper, serBusiness } from '../../service';

/**
 * 内部推荐
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
        console.debug("我是 applydetail.ts", this);
        this.init();
    }

    applyDetails;
    init() {
        this.applyDetails = this.serBusiness.serApi.apply.queryById({ id: 5 });
    }
}
