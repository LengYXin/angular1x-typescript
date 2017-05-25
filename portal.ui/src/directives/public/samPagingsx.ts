import { serHelper, serBusiness } from '../../service';

/**
 *分页 上下页
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {
    }
    restrict = 'AE';
    // transclude = true;
    scope = {
        pagingConfig: "="
    };
    replace = true;
    controller = Controller;
    controllerAs = "VMpaging";
    templateUrl = 'directives/public/samPagingsx.tpl.html';
    link(
        scope: any,
        element: ng.IRootElementService,
        attrs: ng.IAttributes
    ) {
        // scope["Paging"] = new Controller(scope, element);
    }
}
class Controller {
    static $inject = ['$scope', '$state', '$timeout', 'toastr'];
    constructor(
        private $scope: ng.IScope,
        private $state: ng.ui.IStateService,
        private $timeout: ng.ITimeoutService,
        private toastr: any
    ) {
        // 防止没有参数对象报错
        // debugger
        // angular.extend(this.$scope.pagingConfig.params, {});
        if (this.$scope.pagingConfig.params == null || this.$scope.pagingConfig.params.pageIndex == null) {
            
            if (this.$scope.pagingConfig.params == null) {
                this.$scope.pagingConfig.params = {};
            }
            this.$scope.pagingConfig.params.pageIndex = 1;
        }
        this.pagingConfig = this.$scope.pagingConfig;
        //tab跳转重新加载pageindex置1
        this.$scope.$watch("pagingConfig.params.pageIndex",function(newValue,oldValue, scope){
            //console.log("-------new,old",newValue,oldValue,scope);
            scope.VMpaging.pageIndex = scope.pagingConfig.params.pageIndex;
        });
    }
    pagingConfig;
    timeout;
    pageIndex = 1;
    NextBtnDisabled = false;
    Loading = false;
    Go(type) {
        if (type == "Prev" && this.pagingConfig.params.pageIndex <= 1 || type == "Next" && this.NextBtnDisabled) {
            return;
        }
        if (this.timeout) {
            this.$timeout.cancel(this.timeout);
        }
        this.timeout = this.$timeout(x => {
            this.Loading = true;
            type == "Next" ? this.pagingConfig.params.pageIndex++ : this.pagingConfig.params.pageIndex--;
            if (this.pagingConfig.params.pageIndex <= 1) {
                this.pagingConfig.params.pageIndex = 1;
            }
            this.pagingConfig.onCallback(type, x => {
                this.Callback(type, x);
            });
        }, 200);
    }
    Callback(type, data) {
        // console.log("aaaaaaaaaaaaaaaaaaaa",this.$state.current.name);
        if (data && data.length >= 1) {
            this.pagingConfig.item = data;
            this.NextBtnDisabled = false;
        } else {
            this.NextBtnDisabled = true;
            this.toastr.warning('没有更多数据了!', '', { timeOut: 500, allowHtml: true });
            if (this.pagingConfig.params.pageIndex != 1) {
                type == "Next" ? this.pagingConfig.params.pageIndex-- : this.pagingConfig.params.pageIndex++;
            }
        }
        if (this.pagingConfig.state)
            this.$state.go(this.$state.current.name, { pageIndex: this.pagingConfig.params.pageIndex });
        this.pageIndex = this.pagingConfig.params.pageIndex;
        this.Loading = false;

    }
}
