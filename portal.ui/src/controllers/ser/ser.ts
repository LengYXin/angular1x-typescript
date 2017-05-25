import { serHelper, serBusiness } from '../../service';

/**
 * 自助服务
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', '$element', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];

    constructor(
        public $scope: ng.IScope,
        public $element: ng.IRootElementService,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        // this.init();
    }
    menus=this.serBusiness.serApi.basekv.findSelfMenu();
    swiperConfig: yxInterface.ISwiperCarouselfigureConfig = {
        dataList: this.serBusiness.serApi.basekv.findCarouselByKey("selfhelper.homecarousel",1692,300)
    };
    

}
