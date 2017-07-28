/**
  功能按钮组
 */
import * as Allocation from '../../Allocation';
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
        this.conbody = $("body>.container-body")[0];
        // 有无滚动条  按钮组的位置变化
        // this.$scope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
        //     let cons = 10;
        //     let onConBody = function () {
        //         if (cons < 1) {
        //             return;
        //         }
        //         cons--;
        //         setTimeout(function () {
        //             if (conbody.scrollHeight == conbody.clientHeight) {
        //                 $element.attr("style", "right:5px");
        //             } else {
        //                 $element.removeAttr("style");
        //             }
        //             // console.log(conbody.scrollHeight, conbody.clientHeight);
        //             onConBody();
        //         }, 500);
        //     }
        //     onConBody();
        // });
        this.serHelper.$rootScope.$on("$viewContentLoaded", () => {
            // console.log("viewContentLoaded");
            let cons = 5;
            let onConBody = () => {
                if (cons < 1) {
                    return;
                }
                cons--;
                setTimeout(() => {
                    if (this.conbody.scrollHeight == this.conbody.clientHeight) {
                        $element.attr("style", "right:5px");
                        this.onTopIsShow();
                    } else {
                        $element.removeAttr("style");
                    }
                    // console.log(conbody.scrollHeight, conbody.clientHeight);
                    onConBody();
                }, 500);
            }
            onConBody();
        });
        // 计算滚动条距离顶部高度
        let mouSetTimeout = null;
        $(document).on("mousewheel", e => {
            if (mouSetTimeout) {
                clearTimeout(mouSetTimeout);
            }
            mouSetTimeout = setTimeout(() => {
                this.onTopIsShow();
            }, 100);
        });
    }
    //
    conbody;
    //top  按钮显示
    TopShow = { opacity: "0", visibility: "hidden" };
    //反馈内容
    comment;
    //二维码
    QRCode;
    onTop() {
        // console.log("object");
        $(this.conbody).animate({ scrollTop: 0 }, 500, () => {
            this.onTopIsShow();
        });
    }
    onTopIsShow() {
        if ($(this.conbody).scrollTop() > 200) {
            this.$scope.$apply(() => {
                this.TopShow.opacity = "1";
                this.TopShow.visibility = "";

            })
        } else {
            this.$scope.$apply(() => {
                this.TopShow.opacity = "0";
                this.TopShow.visibility = "hidden";
            })
        }
    }
    // 反馈
    feedback() {
        // this.serBusiness.serApi.feedback.add(this.comment).then(x => {
        //     this.comment = "";
        //     this.serHelper.ngDialog.close();
        //     this.serHelper.toastr.success("您的反馈已提交！", "", { timeOut: 1000, allowHtml: true });
        // });
    }
    // 咨询
    consultation() {
        if (this.title == "咨询") {
            if (this.con_type == null) {
                this.serHelper.toastr.success("您未选择咨询分类", "", { timeOut: 1000, allowHtml: true });
                return;
            }
        }
        let users = "#";
        for (var i = 0; i < this.con_type.ApprorList.length; i++) {
            users += this.con_type.ApprorList[i].Appror + "#";
        }
        console.log(users);

        // this.serBusiness.serApi.consultation.add({ consultation: this.comment, type: this.con_type.TypeDescr, respUid: users }).then(x => {
        //     this.comment = "";
        //     this.serHelper.ngDialog.close();
        //     this.serHelper.toastr.success("您的咨询已提交！", "", { timeOut: 1000, allowHtml: true });
        // });
    }
    title = '咨询';
    types = [];
    con_type: any = null;
    openDialog(title, lab, fnStr) {
        if (this.title != title) {
            this.comment = "";
        }
        this.title = title;
        this.serHelper.ngDialog.open({
            template:
            `
           <div class="panel">
				<div class="panel-heading ">
					<h3 class="panel-title ">${title}</h3>
				</div>
				<div class="panel-body">                
						<div class="form-group define_Dialogs-Pad pb0" ng-if="vm.con_type!=null">
						    <label >分类：</label>                          
                            <select ng-model="vm.con_type" ng-options="x.TypeDescr for x in vm.types" class="form-control">
                            </select>
						</div>
						<div class="form-group define_Dialogs-Pad">
						    <label >${lab}：</label>
                            <div class="po-re">
                                <textarea class="form-control pb30" rows="9" maxlength="200" ng-model="vm.comment" placeholder="请输入您的问题......"></textarea>
                                <p class="po-ab txt-num c39 fz14 mb0 pb5 pr15"><span ng-bind="vm.comment.length||0"></span>/200</p>
                            </div>
						</div>
						<div class="form-group mb0 mt20">						
							<div class="text-center dialog-footer">							 
								  <button type="button" class="btn btn-danger w80 mr30" ng-disabled="vm.comment.length<1" ng-click="${fnStr}">提交</button>
								  <button type="button" class="btn btn-default w80"  ng-click="closeThisDialog()">取消</button>
							</div>
						</div>				   
				</div>
			</div>
            `,
            plain: true,
            closeByEscape: false,
            closeByDocument: false,
            width: 500,
            showClose: true,
            scope: this.$scope,
            className: 'ngdialog-theme-default dialog-padding-top3pre',
            controller: () => {
                this.types = [];
                this.con_type = null;
                if (title == "咨询") {
                    this.con_type = {};
                    this.serHelper.$timeout(() => {
                        //获取咨询分类
                        // this.serBusiness.serApi.consultation.getConsultant().then(x => {
                        //     this.types = angular.fromJson(x);
                        //     this.con_type = this.types[0];
                        //     console.log("我是咨询分类", this.types);
                        // });
                    }, 200);
                }
            }
        });
    }
}