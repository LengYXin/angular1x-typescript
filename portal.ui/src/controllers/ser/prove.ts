import { serHelper, serBusiness } from '../../service';
import * as GlobalConfig from '../../config';
/**
 * 办理证明
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
            this.model.comp_descr = x.comp_descr;
            this.model.emplid = x.emplid;
            this.model.name_display = x.name_display;
            this.model.addressee = x.name_display;
            this.model.mobile = x.mobile;
            this.model.address = x.yc_wrk_city;
            this.model.deptname = x.deptname;
            this.model.jobcode_desc = x.jobcode_desc;
        });
    }
    //当前用户信息  findInfo.myinfo
    // myinfo;// = this.serBusiness.serApi.user.findInfo;
    model: any = {
        language: "zh",
        channel: "mail"
    };
    //Job  income  custom
    //incumbency   收入    自定义
    proveType = "incumbency";
    // 切换证明类型
    switchProveType(type) {
        this.proveType = type;
    }
    submitBtnState = false;

    // 提交表单
    submit(Form: ng.IFormController) {
        if (Form.$valid) {
            this.submitBtnState = true;
            // 自定义先上传文件 在执行保存
            if (this.proveType == 'custom') {
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
                this.save();
            }
        } else {
            this.serHelper.toastr.error("表单未填写完整！", "", { timeOut: 1000, allowHtml: true });
        }
    }
    // 保存数据
    save() {
        let title = this.proveType == "incumbency" ? "在职证明" : this.proveType == "income" ? "收入证明" : "自定义证明";
        this.serBusiness.serApi.apply.add({ content: this.model, type: this.proveType, title: title }).then(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.success("申请完成！", "", { timeOut: 1000, allowHtml: true });
            this.serHelper.$state.go("user.myapply");

            //------------------scf---------------------
            let uc = this.serBusiness.serUserContext.UserContext;
            let ucode = uc["ucode"];
            let wf_url:string = '/scf/wf/boot';
            let wf_args={"AK":"yx","PK":"proof","Version":"v1","User":ucode,"Users":["hrcs2"],Biz:x};
            this.serHelper.$http.post(wf_url,wf_args);
            //------------------scf---------------------
        }).catch(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.error("申请失败！", "", { timeOut: 1000, allowHtml: true });
        });
    }
}
