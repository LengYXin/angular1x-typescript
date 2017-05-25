import { serHelper, serBusiness } from '../../service';

/**
 * 办理居住证
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
            this.model.deptname = x.deptname;
        });
        this.serBusiness.serApi.user.getResidence().then(x=>{
          this.residence = x;  
        });
        console.log(this);
    }
    model: any = {
    };
    residence;
    submitBtnState = false;
    // 提交表单
    submit(Form: ng.IFormController) {
        this.submitBtnState = true;
        this.save();
    }
    // 保存数据
    save() {
        this.serBusiness.serApi.apply.add({ content: this.model, type: "residence", title: "办理居住证" }).then(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.success("申请完成！", "", { timeOut: 1000, allowHtml: true });
            this.serHelper.$state.go("user.myapply");

            //------------------scf---------------------
            let uc = this.serBusiness.serUserContext.UserContext;
            let ucode = uc["ucode"];
            let wf_url:string = '/scf/wf/boot';
            let wf_args={"AK":"yx","PK":"live","Version":"v1","User":ucode,"Users":["hrcs2"],Biz:x};
            this.serHelper.$http.post(wf_url,wf_args);
            //------------------scf---------------------
        }).catch(x => {
            this.submitBtnState = false;
            this.serHelper.toastr.error("申请失败！", "", { timeOut: 1000, allowHtml: true });
        });
    }
}
