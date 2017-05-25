import { serHelper, serBusiness } from '../../service';
import * as GlobalConfig from '../../config';

/**
 * 公章使用
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
        this.serBusiness.serApi.user.findInfo_myinfo.then(x => {
            this.model.name_display = x.name_display;
            this.model.deptname = x.deptname;
            this.model.mobile = x.mobile;
        });
    }
    //当前用户信息  
    // myinfo;
    model: any = {
        number: 1,
    };
    submitBtnState = false;
    // 提交表单
    submit(Form: ng.IFormController) {
        if (Form.$valid) {
            this.submitBtnState = true;
            // 自定义先上传文件 在执行保存
             if (!(this.model.file && this.model.file.size > 0)) {
                    this.submitBtnState = false;
                    this.serHelper.toastr.error("请上传文件！", "", { timeOut: 1000, allowHtml: true })
                    return;
                }
            this.serHelper.Upload.upload({
                url: GlobalConfig.uploaderUrl,
                data: { file: this.model.file, tag: 1, name: '' }
            }).then(r => {
                // console.log(r.data.data.url);
                this.model.fileUrl = r.data.data.url;
                this.save();
            }, function (resp) {
                console.log('ngUpload Error status: ' + resp.status);
            }, function (evt) {

            });
        } else {
            this.serHelper.toastr.error("表单未填写完整！", "", { timeOut: 1000, allowHtml: true });
        }
    }
    // 保存数据
    save() {
        this.serBusiness.serApi.apply.add({ content: this.model, type: "seals", title: "公章使用" }).then(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.success("申请完成！", "", { timeOut: 1000, allowHtml: true });
            this.serHelper.$state.go("user.myapply");

            //------------------scf---------------------
            let uc = this.serBusiness.serUserContext.UserContext;
            let ucode = uc["ucode"];
            let wf_url:string = '/scf/wf/boot';
            let wf_args={"AK":"yx","PK":"seal","Version":"v1","User":ucode,"Users":["hrcs2","hrcs3"],Biz:x};
            this.serHelper.$http.post(wf_url,wf_args);
            //------------------scf---------------------
        }).catch(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.error("申请失败！", "", { timeOut: 1000, allowHtml: true });
        });
    }
}
