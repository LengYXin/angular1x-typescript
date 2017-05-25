import { serHelper, serBusiness } from '../../service';

/**
 * 富文本
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

    }
      datetimepicker = {
        timepicker: false
    };
    Editor: string = `<p><img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/qq_thumb.gif"><br></p><p><br></p>`;
    console() {
        console.log(this.Editor);
    }
    ngDialog() {
        this.serHelper.ngDialog.open({
            template: 'templates/demo/Editor-dialog.tpl.html',
            className: 'ngdialog-theme-default',
            scope: this.$scope
        });
    }
}
