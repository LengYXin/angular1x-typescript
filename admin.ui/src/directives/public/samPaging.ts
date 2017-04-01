import { serHelper, serBusiness } from '../../service';

/**
 *分页
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {
    }
    restrict = 'AE';
    // transclude = true;
    scope = false;
    replace = true;
    // controller = Controller;
    // controllerAs = "Paging";
    templateUrl = 'directives/samPaging.tpl.html';
    link(
        scope: any,
        element: ng.IRootElementService,
        attrs: ng.IAttributes
    ) {
        scope["Paging"] = new Controller(scope, element);
    }
}
class Controller {
    //输出页码
    PageNumber: number[] = [];
    PageNum: number;
    //数据量
    Count: number;
    //省略号
    Spot = {
        Prev: false,
        Next: false,
    }
    //当前页码
    currentPage: number = 1;
    constructor(
        private $scope: { vm: yxInterface.IPaging },
        private $element: ng.IRootElementService,
    ) {
        this.currentPage = this.$scope.vm.PagingConfig.params.page_index;
        this.PageNum = this.$scope.vm.PagingConfig.pageCount;
        this.Count = this.$scope.vm.PagingConfig.count;
        // console.debug("分页", $scope.vm.loadDataConfig.pageCount);
        let pageCount = $scope.vm.PagingConfig.pageCount;
        let page = 1;
        while (page <= pageCount) {
            this.PageNumber.push(page);
            page++
        }
        this.Page();
    }
    //计算显示的页码
    Page() {
        let i = this.currentPage;
        let j = i + 9;
        let list = [];
        //总页码大于10 取当前页前后5页 
        if (i > 5 && this.$scope.vm.PagingConfig.pageCount > 10) {
            i -= 5;
            j -= 5;
        } else {
            i = 1;
            j = 10;
        }
        if (j > this.$scope.vm.PagingConfig.pageCount) {
            j = this.$scope.vm.PagingConfig.pageCount;
            i = j - 9;
        }
        i = i < 1 ? 1 : i;
        for (i; i <= j; i++) {
            list.push(i);
        }
        this.PageNumber = list;
        //计算 省略号显示
        this.Spot.Prev = this.PageNumber[0] > 1;
        this.Spot.Next = this.PageNumber[this.PageNumber.length - 1] < this.$scope.vm.PagingConfig.pageCount;
    }
    Prev(index) {
        if (this.currentPage == 1) {
            return;
        }
        this.currentPage -= index;
        this.GO(this.currentPage);
    }
    Next(index) {
        if (this.currentPage == this.$scope.vm.PagingConfig.pageCount) {
            return;
        }
        this.currentPage += index;
        this.GO(this.currentPage);
    }
    GO(index) {
        this.currentPage = index < 1 ? 1 : this.$scope.vm.PagingConfig.pageCount < index ? this.$scope.vm.PagingConfig.pageCount : index;
        this.$scope.vm.PagingConfig.params.page_index = this.currentPage;
        this.$scope.vm.PagingLoadData();
        this.Page();
    }
}
