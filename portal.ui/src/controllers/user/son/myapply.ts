import { serHelper, serBusiness } from '../../../service';

/**
 * 首页控制器
 */

export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    //dateTime: string = "";
    //dateTime2: string = "";
    datetimepicker = {
        timepicker: false
    };
    //datetimepicker2 = {timepicker: false};
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness
    ) {
        console.log("myapply 控制器", this);
        this.init();
    }
    wf_objs = {};
    // 分页配置
    pagingConfig = {
        //数据存储集合
        item: [],
        //参数
        params: {
            pageIndex: 1,
            type: "",
            beginTime: "",
            endTime: "",
            handle:false
            // pageSize: 1
        },
        //启用地址 默认 false
        state: true,
        onCallback: (t, c) => {
            this.serBusiness.serApi.apply.queryApply(this.pagingConfig.params).then(x => {
                c(x);
                //console.log("c",c);
                //console.log("x",x);
            });
        }
    };

    isApply = true;
    init() {
        
        this.serBusiness.serApi.apply.queryApply(this.pagingConfig.params).then(x => {
            if (!x || x.length < 1)
                this.serHelper.$state.go(this.serHelper.$state.current.name, { pageIndex: 1 });
            this.pagingConfig.item = x;
            console.log(this.pagingConfig.item);
        });
        

        // // //------------------scf---------------------
        // let wf_url:string = '/scf/wf/list/'+(this.pagingConfig.params.handle?"closed":"ongoing");
        // let uc = this.serBusiness.serUserContext.UserContext;
        // let ucode = uc["ucode"];
        // let wf_args = {AK:"yx",User:ucode}
        // this.serHelper.$http.post(wf_url,wf_args).success(x=>{
        //     if(x["Code"]!=0)return;
        //     let arr=[];
        //     let data = x["Data"];
        //     if (data!=null) {
        //         data.forEach(element => {
        //             arr.push(element.Biz.apply_id);
        //             this.wf_objs[element.Biz.apply_id] = element;
        //         });
        //     }
        //     let params = {ids: arr.join(',') };
        //     this.serBusiness.serApi.apply.queryByIds(params).then(x => {
        //         if (!x || x.length < 1)
        //             this.serHelper.$state.go(this.serHelper.$state.current.name, { pageIndex: 1 });
        //         this.pagingConfig.item = x;
                
        //         x.forEach(element => {
        //             let wf_obj = this.wf_objs[element.apply_id];
        //             if (wf_obj==null) return;
        //             if (wf_obj.Status=='ongoing'){
        //                 element.status = 1;
        //             }else if (wf_obj.Status=='closed'){
        //                 element.status = 2;
        //             }
        //             if (wf_obj.Current_Activity){
        //                 element.name_display = wf_obj.Current_Activity.Todos
        //             }
        //         });
        //     });    
        // });
        // // //------------------scf---------------------
    }
    //搜索
    searchContent;
    searchMyapply() {
        this.pagingConfig.params.type = this.searchContent.TypeName;
        this.pagingConfig.params.beginTime = this.searchContent.BeginTime;
        this.pagingConfig.params.endTime = this.searchContent.EndTime;
        this.init();
    }
    gethandling(){
        if(this.pagingConfig.params.handle == true){
            this.pagingConfig.params.pageIndex = 1;
            this.pagingConfig.params.handle = false;
            console.log("gethandling",this.pagingConfig);
            this.init();
        }
    }
    gethandled(){
        if(this.pagingConfig.params.handle == false){
            this.pagingConfig.params.pageIndex = 1;
            this.pagingConfig.params.handle = true;
            console.log("gethandled",this.pagingConfig);
           this.init();
        }
    }

    //展示详情
    residence;
    model;
    showDetails(col) {
        let _id = col.apply_id;
        let _psId = col.ps_id;
        this.serBusiness.serApi.apply.queryById({ id: _id }).then(x => {
            this.applyDetails = x;
            this.model = x.content;
            //console.log(x);
            switch (x.type) {
                case "income":// 收入证明
                case "incumbency"://在职
                    this.applyDetails.applyUrl = 'templates/user/myapply/incumbency.tpl.html';
                    this.openDetailsDialog();
                    break;
                case "residence"://居住证
                    // this.serBusiness.serApi.user.getResidence().then(x => {
                    //     this.applyDetails.applyUrl = 'templates/user/myapply/residence.tpl.html';
                    //     this.residence = x;
                    //     console.log(this.residence);
                    //     this.openDetailsDialog();
                    // });
                    this.applyDetails.applyUrl = 'templates/user/myapply/residence.tpl.html';
                    this.openDetailsDialog();
                    break;
                case "passive"://被动离职
                case "leave"://离职证明
                    this.applyDetails.applyUrl = 'templates/user/myapply/leave.tpl.html';
                    this.openDetailsDialog();
                    break;
                case "seals"://公章
                    this.applyDetails.applyUrl = 'templates/user/myapply/seals.tpl.html';
                    this.openDetailsDialog();
                    break;
                case "bankid"://修改银行卡
                    this.applyDetails.applyUrl = 'templates/user/myapply/changebankid.tpl.html';
                    this.openDetailsDialog();
                    break;
                case "entry"://入职
                    this.applyDetails.applyUrl = 'templates/user/myapply/entry.tpl.html';
                    this.openDetailsDialog();
                    break;
                case "positive"://转正
                    this.applyDetails.applyUrl = 'templates/user/myapply/positive.tpl.html';
                    this.openDetailsDialog();
                    break;

                default:
                    break;
            }
        });
        this.findHandle(_id);
        this.findHandler(_psId);
    }

    //处理记录
    handleHistory;
    findHandle(_applyId){
        
        this.serBusiness.serApi.apply.findHandle({ applyId: _applyId }).then(x => {
            console.log("x",x);
            this.handleHistory = x;
        });
    }
    //审批人
    findHandler(_psId){
        
        this.serBusiness.serApi.apply.getHandle(_psId).then(x=>{
            console.log(_psId,x);
            if(x!=null && x.ApprorList!=null){
                this.applyDetails.ApprorList = [];
                var nowHandler = null;
                if(x.ApprorList!=null){
                    if(x.ApprorList.length>0){                    
                        nowHandler = x.ApprorList[0];
                    }
                    var nextHandler = null;
                    for(var i=1;i<x.ApprorList.length;i++){
                        nextHandler = x.ApprorList[i];
                        //先判断stage级别
                        if(nowHandler.Stage == nextHandler.Stage){
                            //再判断Path
                            if(nowHandler.Path==nextHandler.Path){
                                console.log("----path相同");
                                //最后判断Step,最后判断Step肯定是不同的，判断staus就好了
                                if(nowHandler.Status!=nextHandler.Status && nowHandler.Status == "A"){
                                    //两者不同，判断上边为已审批通过
                                    nowHandler = nextHandler;
                                }
                            }
                            else{
                                console.log("----path不同");
                                //path不同可并行,按上边且非未执行的为先
                                if(nowHandler.Status!=nextHandler.Status && nowHandler.Status == "A"){
                                    //两者不同，判断上边为已审批通过
                                    nowHandler = nextHandler;
                                }
                            }
                        }else{
                            //Stage级别变化，将上一节点保存
                            console.log("---stage不同");
                            this.applyDetails.ApprorList.push(nowHandler);
                            nowHandler = nextHandler;
                        }

                    }
                    if(nowHandler!=null){
                        console.log("--------最后一个");                        
                        this.applyDetails.ApprorList.push(nowHandler);
                    }
                }
                else{
                    console.log("nullnullnull");
                }
                console.log("this.applyDetails.ApprorList",this.applyDetails.ApprorList);                
            }

        })
    }


    applyDetails;
    openDetailsDialog() {

        this.serHelper.ngDialog.open({
            template: "templates/user/myapply/applydetails.tpl.html",
            showClose: true,
            closeByEscape: false,
            closeByDocument: false,
            scope: this.$scope,
            width: "1000px",
            className: 'ngdialog-theme-default dialog-padding-top3pre',
            controller: () => {

            }
        });
    }
}
