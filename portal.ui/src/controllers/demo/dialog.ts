import { serHelper, serBusiness } from '../../service';

/**
 * 首页控制器
 */
 
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {

    }
    clickToOpen(type: number) {
        switch (type) {
            case 1:
                this.serHelper.ngDialog.open({ template: 'templates/demo/dialog-a.tpl.html', className: 'ngdialog-theme-default' });
                break;
            case 2:
                this.serHelper.toastr.success('Hello world!', 'Toastr fun!');
                break;
            case 3:
                this.serHelper.toastr.info('Hello world!', 'Toastr fun!');
                break;
            case 4:
                this.serHelper.toastr.warning('Hello world!', 'Toastr fun!');
                break;
            case 5:
                this.serHelper.toastr.error('Hello world!', 'Toastr fun!');
                break;
            case 6:
                this.serHelper.cfpLoadingBar.start();
                break;
            default:
                break;
        }
    }
}
