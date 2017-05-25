import { serHelper, serBusiness } from '../../service';

/**
 * 文化
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = ["pageIndex"];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        this.init();
    }
    // 分页配置
    pagingConfig = {
        //数据存储集合
        item: [],
        //参数
        params: {
            pageIndex: this.serHelper.$stateParams.pageIndex,
            // pageSize: 1
        },
        //启用地址 默认 false
        state: true,
        onCallback: (x, c) => {
            this.serBusiness.serApi.culture.queryAll(this.pagingConfig.params).then(x => {
                c(x);
            });
        }
    };
    init() {
        this.serBusiness.serApi.culture.queryAll(this.pagingConfig.params).then(x => {
            if (!x || x.length < 1)
                this.serHelper.$state.go(this.serHelper.$state.current.name, { pageIndex: 1 });
            this.pagingConfig.item = x;
            console.log(x);
        });
    }
}
