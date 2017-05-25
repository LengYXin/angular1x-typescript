
/**************************************
   ******       serHelper  所有 全局单列 自定义服务 综合类
  ************************************/
import * as GlobalConfig from '../../config';
import serHttpInterceptor from './serHttpInterceptor';
import serHTTP from './serHTTP';
import serStorage from './serStorage';
import serSession from './serSession';
import serQiniu from './serQiniu';

export default class {
    //服务器类型 默认为 service 
    static $type = GlobalConfig.EnumServicesType.service;
    static $inject = [
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$q',
        '$timeout',
        '$filter',
        '$cookies',
        'Upload',
        'ngDialog',
        'cfpLoadingBar',
        'toastr',
        'serStorage',
        'serSession',
        'serHTTP',
        'serQiniu'
    ];
    constructor(
        public $rootScope: ng.IRootScopeService,
        public $state: ng.ui.IStateService,
        public $stateParams: ng.ui.IStateParamsService,
        public $http: ng.IHttpService,
        public $q: ng.IQService,
        public $timeout: ng.ITimeoutService,
        public $filter: ng.IFilterService,
        public $cookies: any,
        public Upload: any,
        public ngDialog: any,
        public cfpLoadingBar: any,
        public toastr: { success: any, info: any, warning: any, error: any },
        public serStorage: serStorage,
        public serSession: serSession,
        public serHTTP: serHTTP,
        public serQiniu: serQiniu,

    ) {
        // this.$rootScope.$broadcast("pageFinishedLoading", 1);
        GlobalConfig.debug ? console.debug("serHelper", this) : undefined;
    }

    /**
     * 自定义 Dialog Confirm
     * @param title 提示标题
     * @param content 内容
     * @param fnStr 确定按钮的操作
     * @param scope $scope
     */
    delConfirm(title, content, fnStr, scope) {
        this.ngDialog.open({
            template:
            `
           <div class="panel">
				<div class="panel-heading ">
					<h3 class="panel-title ">${title}</h3>
				</div>
				<div class="panel-body">
						<div class="form-group">
                            <h3 style="text-align:center;">${content}</h3>
                        </div>
                        <br/>
						<div class="form-group">						
							<div class="text-center">							 
								  <button type="button" class="btn" ng-click="${fnStr}">确定</button>
								  <button type="button" class="btn" ng-click="closeThisDialog()">取消</button>
							</div>
						</div>	
                        <br/>			   
				</div>
			</div>
            `,
            plain: true,
            showClose: false,
            scope: scope,
            className: 'ngdialog-theme-default ngdialog-minbtns-comment'
        });
    }
}
