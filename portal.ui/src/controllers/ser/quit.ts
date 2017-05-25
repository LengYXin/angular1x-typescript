import { serHelper, serBusiness } from '../../service';
import * as GlobalConfig from '../../config';

/**
 * 离职申请
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
            this.model.emplid = x.emplid;
            this.model.name_display = x.name_display;
            this.model.mobile = x.mobile;
            this.model.deptname = x.deptname;
            this.model.supv_level = x.supv_level;
            this.model.jobcode_desc = x.jobcode_desc;
            this.model.hire_dt = x.hire_dt;
        });
    }
    datetimepicker = {
        timepicker: false
    };
    model: any = {
        dateTime: this.serHelper.$filter("date")(new Date().getTime(), "yyyy-MM-dd"),
        type: "edit",//upload  edit
        Editor: ``
    };
    submitBtnState = false;
    submit(Form: ng.IFormController) {
        if (Form.$valid) {
            this.submitBtnState = true;
            // 自定义先上传文件 在执行保存
            if (this.model.type == 'upload') {
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
                if (this.model.Editor && this.model.Editor.length > 0 && this.model.Editor != '<p><br></p>') {
                    this.save();
                } else {
                    this.submitBtnState = false;
                    this.serHelper.toastr.warning('没有填写内容!', '', { timeOut: 1000, allowHtml: true });
                }

            }
        } else {
            this.serHelper.toastr.error("表单未填写完整！", "", { timeOut: 1000, allowHtml: true });
        }
    }
    // 保存数据
    save() {
        this.serBusiness.serApi.apply.add({ content: this.model, type: "leave", title: "离职申请" }).then(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.success("申请完成！", "", { timeOut: 1000, allowHtml: true });
            this.serHelper.$state.go("user.myapply");

            //------------------scf---------------------
            let uc = this.serBusiness.serUserContext.UserContext;
            let ucode = uc["ucode"];
            let wf_url: string = '/scf/wf/boot';
            let wf_args = { "AK": "yx", "PK": "quit", "Version": "v1", "User": ucode, "Users": ["hrcs2", "hrcs3"], Biz: x };
            this.serHelper.$http.post(wf_url, wf_args);
            //------------------scf---------------------
        }).catch(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.error("申请失败！", "", { timeOut: 1000, allowHtml: true });
        });
    }
}
