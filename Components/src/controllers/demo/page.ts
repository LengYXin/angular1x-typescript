import { serHelper, serBusiness } from '../../service';

import { Paging } from '../../baseClass/Paging';

export default class extends Paging {
    static $inject = ['$scope', 'serHelper'];
     //路由参数
    static $stateParams = [];
    // params: any;
    // constructor(
    //     public $scope: ng.IScope,
    //     public serHelper: serHelper,
    // ) {
    //     super(serHelper);

    //     this.PagingConfig.url = "sys/UserList";
    //     this.PagingConfig.cb = function (data, p) { };

    //     this.params = this.PagingConfig.params;
    //     this.PagingConfig.params["key"] = "";
    //     this.PagingLoadData();
    // }
    // search() {
    //     this.PagingConfig.params.page_index = 1;
    //     this.PagingLoadData();
    // }
    // remove(row) {
    //     console.info('remove', row)
    // }
}