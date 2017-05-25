import { serHelper, serBusiness } from '../../../service';
import * as GlobalConfig from '../../../config';

/**
 * 被动离职申请
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
        console.log("被动离职 控制器", this);
        this.countrySelected = this.countrySelected.bind(this);
    }
     datetimepicker = {
        timepicker: false
    };
    model: any = {
        dateTime: this.serHelper.$filter("date")(new Date().getTime(), "yyyy-MM-dd"),
    };
    // 搜索链接地址
    remoteUrl = GlobalConfig.apiMainUrl + "user/search?s=";
    // 搜索选择
    countrySelected(selected) {
        console.log("选择了----", selected);
        if (selected && selected.originalObject) {
            let x = selected.originalObject;
            this.model.emplid = x.emplid;
            this.model.name_display = x.name_display;
            this.model.mobile = x.mobile;
            this.model.deptname = x.deptname;
            this.model.supv_level = x.supv_level;
            this.model.jobcode_desc = x.jobcode_desc;
            this.model.hire_dt = x.hire_dt;
        } else {
            this.model.emplid = "";
            this.model.name_display = "";
            this.model.mobile = "";
            this.model.deptname = "";
            this.model.supv_level = "";
            this.model.jobcode_desc = "";
            this.model.hire_dt = "";
        }


    }
    submitBtnState = false;
    submit(Form: ng.IFormController) {
        if (Form.$valid && this.model.emplid) {
            this.submitBtnState = true;
            this.save();
        } else {
            this.serHelper.toastr.error("表单未填写完整！", "", { timeOut: 1000, allowHtml: true });
        }
    }
    // 保存数据
    save() {
        this.serBusiness.serApi.apply.add({ content: this.model, type: "passive", title: "被动离职申请" }).then(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.success("申请完成！", "", { timeOut: 1000, allowHtml: true });
            this.serHelper.$state.go("user.myapply");

            //------------------scf---------------------
            let uc = this.serBusiness.serUserContext.UserContext;
            let ucode = uc["ucode"];
            let wf_url: string = '/scf/wf/boot';
            let wf_args = { "AK": "yx", "PK": "quit", "Version": "v1", "User": ucode, "Users": ["hrcs2", "hrcs3"], Biz: { id: x, title: "离职申请" } };
            this.serHelper.$http.post(wf_url, wf_args);
            //------------------scf---------------------
        }).catch(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.error("申请失败！", "", { timeOut: 1000, allowHtml: true });
        });
    }
}
