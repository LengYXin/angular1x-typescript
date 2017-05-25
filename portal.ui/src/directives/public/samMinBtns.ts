/**
  功能按钮组
 */
import * as GlobalConfig from '../../config';
import { serHelper, serBusiness } from '../../service';

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() { }
    scope = true;
    restrict = 'AE';
    replace = true;
    controller = Controller;
    controllerAs = "vm";
    templateUrl = 'directives/public/samMinBtns.tpl.html';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
    }
}
class Controller {
    static $inject = ['$scope', '$element', 'serHelper', 'serBusiness'];
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private serHelper: serHelper,
        private serBusiness: serBusiness
    ) {
        // this.$element.on("mouseenter", x => {
        //     this.$element.addClass("min-btns-into");
        // });
        // this.$element.on("mouseleave", x => {
        //     this.$element.removeClass("min-btns-into");
        // });
        this.QRCode = this.serBusiness.serApi.basekv.findQRCode();
    }
    comment;
    //二维码
    QRCode;

    // 反馈
    feedback() {
        this.serBusiness.serApi.feedback.add(this.comment).then(x => {
            this.serHelper.ngDialog.close();
        });
    }
    // 咨询
    consultation() {
        this.serBusiness.serApi.consultation.add(this.comment).then(x => {
            this.serHelper.ngDialog.close();
        });
    }
    openDialog(title, lab, fnStr) {
        this.comment = "";
        this.serHelper.ngDialog.open({
            template:
            `
           <div class="panel">
				<div class="panel-heading ">
					<h3 class="panel-title ">${title}</h3>
				</div>
				<div class="panel-body">
						<div class="form-group define_Dialogs-Pad">
						    <label >${lab}：</label>
                            <textarea class="form-control" rows="3" ng-model="vm.comment" placeholder="请输入您的问题......"></textarea>
						</div>
						<div class="form-group define_Dialogs-Btn">						
							<div class="text-center">							 
								  <button type="button" class="btn" ng-disabled="vm.comment.length<1" ng-click="${fnStr}">提交</button>
								  <button type="button" class="btn"  ng-click="closeThisDialog()">取消</button>
							</div>
						</div>				   
				</div>
			</div>
            `,
            plain: true,
            width:500,
            showClose: true,
            scope: this.$scope,
            className: 'ngdialog-theme-default ngdialog-minbtns-comment'
        });
    }
}