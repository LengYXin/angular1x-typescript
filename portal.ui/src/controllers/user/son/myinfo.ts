import { serHelper, serBusiness } from '../../../service';
import * as GlobalConfig from '../../../config';
/**
 * 首页控制器
 */

export default class {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'Upload', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    regphone = /^1[34578]\d{9}$/;
    userlogo = this.serHelper.$rootScope.$rootUserContext.avatar;
    schoolType = [
        { value: "01", name: "国家统招" },
        { value: "02", name: "自考" },
        { value: "03", name: "成人教育" },
        { value: "04", name: "夜考" },
        { value: "05", name: "民办" },
        { value: "06", name: "其他" }
    ];
    eduLvl = [
        { value: "E01", name: "博士后" },
        { value: "E02", name: "博士" },
        { value: "E03", name: "硕士" },
        { value: "E04", name: "本科" },
        { value: "E05", name: "大专" },
        { value: "E06", name: "中专" },
        { value: "E07", name: "高中" },
        { value: "E08", name: "其它" }
    ];
    degree = [
        { value: "01", name: "博士后" },
        { value: "02", name: "博士" },
        { value: "03", name: "硕士" },
        { value: "04", name: "学士" },
        { value: "05", name: "无" }
    ];
    relationship = [
        { value: "01", name: "父母" },
        { value: "02", name: "配偶" },
        { value: "03", name: "兄弟姐妹" },
        { value: "04", name: "子女" },
        { value: "05", name: "其他" }
    ];
    //合同不用修改所以可以下面这样写
    contracts = {
        "01": "固定期限劳动合同",
        "02": "无固定期限劳动合同",
        "03": "实习协议",
        "04": "劳务合同",
        "05": "管理人员劳动合同",
        "06": "工作协议（派遣）"
    };





    uploader: any;
    qiniu_uploader: any;
    //qiniu_file: any;
    //qiniu_files: any = [];
    // file: any;
    //files: any;
    imgFile: any = {};
    croppedDataUrl: any = "";
    Qiniu = this.serHelper.serQiniu.Create();
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public Upload: any,
        // public $cookies: any,
        public serBusiness: serBusiness
    ) {
        console.log("myinfo 控制器", this);
        //console.info('myinfo下的upload', Upload);
        this.init();

    }

    myInfo;
    myBasicInfo;
    myExcepInfo;
    user;


    option;
    bubbleSort(array) {
        /*给每个未确定的位置做循环*/
        for (var unfix = array.length - 1; unfix > 0; unfix--) {
            /*给进度做个记录，比到未确定位置*/
            for (var i = 0; i < unfix; i++) {
                if (array[i].effdt > array[i + 1].effdt) {
                    var temp = array[i];
                    array.splice(i, 1, array[i + 1]);
                    array.splice(i + 1, 1, temp);
                }
            }
        }
        return array;
    }
    showMyjobpos() {

        if (this.option == null) {
            var xdata = [];
            var ydata = [];
            var markpoint = [];


            //let testdata = [1, 2, 2, 5, 3, 2, 8];
            this.bubbleSort(this.myInfo.joblvl);
            console.log(this.myInfo.joblvl);
            for (var i = 0; i < this.myInfo.joblvl.length; i++) {
                var myjoblvl = this.myInfo.joblvl[i];
                xdata.push(myjoblvl.effdt);
                ydata.push(myjoblvl.job_lvl.replace("G", ""));
                markpoint.push(
                    {
                        name: myjoblvl.action_descr,
                        value: myjoblvl.job_lvl + "<br />" + myjoblvl.jobcode_descr + "<br />" + myjoblvl.deptlongname,
                        xAxis: i,
                        yAxis: myjoblvl.job_lvl.replace("G", "")
                        //yAxis: testdata[i]
                    });

            }
            this.serHelper.$timeout(x => {
                this.option = {
                    //backgroundColor: '#ccc',
                    tooltip: {
                        trigger: 'item'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: xdata
                        }
                    ],
                    yAxis: [
                        {
                            show: false,
                            min: 0,
                            max: 14
                        }
                    ],
                    series: [
                        {
                            //name:'年级平均正确率',
                            itemStyle: {
                                normal: {
                                    color: "green"
                                }
                            },
                            type: 'line',
                            //data: [1, 2, 2, 5, 3, 2, 8],
                            data: ydata,
                            markPoint: {
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            position: "top",
                                            formatter: '{b}'
                                        }
                                    }
                                },
                                tooltip: {
                                    formatter: function (params) {
                                        return params.value;
                                    }
                                },
                                data: markpoint
                            }

                        }
                    ]
                };
            }, 0);

        }
    }

    init() {
        this.myInfo = this.serBusiness.serApi.user.findInfo;
        console.log("this.myInfo", this.myInfo);
    }


    /*编辑头像 start */
    showEditUserLogo() {
        this.serHelper.ngDialog.open({
            template: 'templates/user/myinfo/dialog-edituserlogo.tpl.html',
            showClose: true,
            closeByEscape: false,
            closeByDocument: false,
            width: "570px",
            scope: this.$scope,
            className: 'ngdialog-theme-default dialog-padding-top3pre'
        });
    }


    qiniuUpToken = this.serBusiness.serApi.sys.uptoken;

    saveUserlogo() {
        //console.log(this.imgFile);
        //console.log(this.croppedDataUrl);  
        if (this.imgFile.name != null) {
            //先保存base64到7niu
            this.serHelper.serQiniu.qiniuBase64(this.croppedDataUrl, this.qiniuUpToken.uptoken).then(x => {
                this.userlogo = this.croppedDataUrl;//`${GlobalConfig.qiniuConfig.images + x.key}`;
                //传到服务器
                this.serBusiness.serApi.user.updateAvatar(`${GlobalConfig.qiniuConfig.images + x.key}`).then(x => {
                    //this.myInfo.myinfo.mobile = this.croppedDataUrl;
                    console.log(x);
                    this.serHelper.$rootScope.$rootUserContext.avatar = this.croppedDataUrl;
                    this.serHelper.ngDialog.close();
                });
            });
            //this.userlogo = this.croppedDataUrl;

        }
    }
    /**编辑头像 end */

    /*修改手机号 start *********************************** */
    //修改手机号弹窗
    telphone;
    showChangeTel(oldtelphone) {
        this.telphone = oldtelphone;
        this.serHelper.ngDialog.open({
            template: 'templates/user/myinfo/dialog-changetel.tpl.html',
            showClose: true,
            scope: this.$scope,
            className: 'ngdialog-theme-default'
        });
    }

    telerrorinfo;
    // 修改手机号
    changeTel(_newTelphone) {
        this.telerrorinfo = "";
        //先验证是否为合法手机号
        var flag = this.regphone.test(_newTelphone); //true
        if (flag) {
            this.serBusiness.serApi.user.updateMobile(_newTelphone).then(x => {
                this.myInfo.myinfo.mobile = _newTelphone;
                this.serHelper.ngDialog.close();
                this.serHelper.toastr.success(x);
            });
        } else {
            this.telerrorinfo = "请输入11位手机号";
        }
    }
    /*修改手机号 end *********************************** */



    /*修改紧急联系人 start *********************************** */
    //修改紧急联系人弹窗
    newcontactName = "";
    newcontactPhone = "";
    showChangeContact(_oldContactName, _oldContactPhone) {
        this.newcontactName = _oldContactName;
        this.newcontactPhone = _oldContactPhone;
        this.serHelper.ngDialog.open({
            template: 'templates/user/myinfo/dialog-changecontact.tpl.html',
            showClose: true,
            scope: this.$scope,
            className: 'ngdialog-theme-default'
        });
    }
    //修改紧急联系人
    contactNameError = "";
    contactPhoneError = "";

    changeContact(newContactName, newContactPhone) {
        this.contactNameError = "";
        this.contactPhoneError = "";
        //ps接口不允许紧密联系人名为空
        if (newContactName == null || $.trim(newContactName).length <= 0) {
            this.contactNameError = "紧急联系人姓名必须填写";
            return;
        }
        //先验证是否为合法手机号
        if (newContactPhone != null && $.trim(newContactPhone).length > 0) {

            var flag = this.regphone.test(newContactPhone); //true
            if (!flag) {
                this.contactPhoneError = "请输入11位手机号";
                return;
            }
        }

        this.serBusiness.serApi.user.updateContactInfo(newContactName, newContactPhone).then(x => {
            this.myInfo.myinfo.contact_name = newContactName;
            this.myInfo.myinfo.contact_phone = newContactPhone;
            this.serHelper.ngDialog.close();
            this.serHelper.toastr.success(x);
        });
    }
    /*修改紧急联系人 end *********************************** */


    /*修改银行卡号 start *********************************** */
    //修改银行卡号弹窗
    bankAccount: any = {};
    disChangeAccound = true;
    showEditBankAccount(_oldBankAccount) {
        //this.qiniu_file = { url: "" };
        this.bankAccount = {};
        this.bankAccountError = {};
        this.bankAccount.account_ec_id = _oldBankAccount;

        this.serHelper.ngDialog.open({
            template: 'templates/user/myinfo/dialog-editbankaccount.tpl.html',
            showClose: true,
            closeByEscape: false,
            closeByDocument: false,
            width: "670px",
            scope: this.$scope,
            className: 'ngdialog-theme-default dialog-padding-top3pre',
            controller: () => {
                this.serHelper.$timeout(() => {
                    this.get35notchange();
                    this.disChangeAccound = false;


                    this.uploader = new plupload.Uploader({
                        browse_button: "bankpic_button",
                        url: GlobalConfig.apiMainUrl + "/user/uploadAccountEcId",
                        // headers: { 'sso-token': this.$cookies.get('sso-token') },
                    });

                    this.uploader.bind('FilesAdded', (up, files) => {
                        console.info('plupload FilesAdded', files);
                        // list_group = ` <div class="list-group">`;
                        // bar[0].style.width = "0%";
                        // bar.text("0%");
                        // $.each(files, (i, x) => {
                        //     filesSize += x.size;
                        // });
                        setTimeout(() => {
                            this.uploader.start();
                        }, 500);
                    });
                    //let list_group = ` <div class="list-group">`;
                    //单个文件上传成功
                    let filesSize = 0;
                    let filesLoaded = 0;
                    this.uploader.bind("FileUploaded", (up, file, res) => {

                        filesLoaded += file.loaded;
                        res = JSON.parse(res.response);
                        console.log("FileUploaded", res);
                        if (res.data != null && res.data.url != null) {
                            this.$scope.$apply(() => {
                                //this.qiniu_file = res.data;
                                //临时加ip，以后要换成域名
                                this.bankAccount.img = "http://192.168.155.243/" + res.data.url;
                                var imgext = res.data.url;
                                if (imgext != null && imgext.length > 0) {
                                    let extlength = imgext.lastIndexOf(".");
                                    imgext = imgext.substr(extlength) || ".png";
                                }
                                this.bankAccount.imgname = this.myInfo.myinfo.name_display + "的银行卡" + imgext
                                console.log("-----------------------", this.bankAccount);
                            })
                            //list_group += ` <a class="list-group-item" style="padding:8px" target="_blank" href="${res.data.url}"><i class="fa fa-download"></i>    FileName：  ${file.name}</a>`;
                        }
                    });
                    // 上传过程不断触发
                    this.uploader.bind('UploadProgress', (up, file) => {
                        let load = Math.ceil((filesLoaded + file.loaded) / filesSize * 100.0);
                        console.info('plupload UploadProgress', Math.ceil((filesLoaded + file.loaded) / filesSize * 100.0));
                        // bar[0].style.width = load + "%";
                        // bar.text(load + "%");
                    });
                    // 全部上传成功
                    this.uploader.bind('UploadComplete', (up, files, r) => {
                        console.info('plupload UploadComplete', up);
                        // up.files = [];
                        // bar[0].style.width = "100%";
                        // bar.text("100%");
                        // list_group += " </div>";
                        // this.editor.command(null, 'insertHtml', list_group);
                    });
                    this.uploader.init();

                    //this.getBankBranch();
                }, 1000);
            }
        });



    }
    // //获取银行支行
    // bankbranchitems;
    // getBankBranch(){
    //     this.bankbranchitems = this.serBusiness.serApi.user.getbankbranch({bankId:"CMB",brandName:"潍坊"});
    //     //this.bankbranchitems =  this.serBusiness.serApi.user.mypost("user/getBankBranch",{bankId:"CMB",brandName:"潍坊"});
    //     console.log("------------",this.bankbranchitems);
    // }

    //此处直接用bankBranchSelected()原型链作用域问题导致this.bankAccount 访问不到；
    bankBranchSelected = (selectitem) => {
        if (selectitem != null && selectitem.originalObject != null) {
            this.bankAccount.bankBranchId = selectitem.originalObject.yc_branck_id;
            this.bankAccount.bankBranchName = selectitem.originalObject.yc_branch_name;
            console.log("-----", selectitem);
        }
    }

    get35notchange() {
        //判断日期是否是每月的3-5号
        let nowDate = (new Date).getDate();
        if (nowDate >= 3 && nowDate <= 5) {
            this.serHelper.toastr.warning("每月的 3 - 5 号不允许修改银行卡，以免影响工资发放");

            this.disChangeAccound = true;
            return;
        }
    }
    // qiniuUpload() {
    //     this.qiniu_uploader.start();
    // }
    //修改银行卡
    bankAccountError: any = {};
    changeBankAccount() {
        this.bankAccountError = {};

        this.get35notchange();

        //先验证是否为16或19位银行卡号
        var reg = /^[0-9]{16,19}$/; //验证规则/^[0-9]{16,19}$/
        var flag = reg.test(this.bankAccount.account_ec_id); //true
        if (flag) {
            if (this.bankAccount.account_ec_id == this.myInfo.myinfo.account_ec_id) {
                this.bankAccountError.accountIdError = "您没有修改银行卡号";
                return;
            }
            if (this.bankAccount.bankBranchId == null || this.bankAccount.bankBranchId == "") {
                this.bankAccountError.branchError = "您未选择支行";
                return;
            }
            if (this.bankAccount.img == null || this.bankAccount.img == "") {
                this.bankAccountError.imgError = "请上传您的新银行卡照片";
                return;
            }
            this.bankAccount.emplid = this.myInfo.myinfo.emplid;
            this.bankAccount.name_display = this.myInfo.myinfo.name_display;
            this.bankAccount.old_account_ec_id = this.myInfo.myinfo.account_ec_id;
            this.bankAccount.account_name = this.myInfo.myinfo.account_name;
            this.bankAccount.account_code = this.myInfo.myinfo.account_code;

            console.log("此处应该调用接口提交申请", angular.toJson(this.bankAccount));

            this.serBusiness.serApi.apply.add({ content: this.bankAccount, type: "bankid", title: "修改银行卡" }).then(x => {

                this.serHelper.ngDialog.close();
                this.serHelper.toastr.success("申请完成！", "", { timeOut: 1000, allowHtml: true });
                this.serHelper.$state.go("user.myapply");
            });
        } else {
            this.bankAccountError.accountIdError = "请输入正确的银行卡号";
        }
    }

    /*修改银行卡号 end *********************************** */

    /*修改工作经历 start *********************************** */
    //添加 或 编辑工作经验
    newworkitem = null;
    isEditwork = false;
    oldwork;
    showEditWork(work) {
        this.newworkError = {};
        if (work == null) {
            this.isEditwork = false;
            this.newworkitem = null
        }
        else {
            this.isEditwork = true;
            //this.newworkitem = work;
            this.oldwork = work;
            this.newworkitem = {
                employer: work.employer,
                start_dt: work.start_dt,
                end_dt: work.end_dt,
                dept_name: work.dept_name,
                ending_title: work.ending_title,
                sequence_nbr: work.sequence_nbr
            }
        }
        this.serHelper.ngDialog.open({
            template: 'templates/user/myinfo/dialog-editwork.tpl.html',
            showClose: true,
            closeByEscape: false,
            closeByDocument: false,
            width: "570px",
            scope: this.$scope,
            className: 'ngdialog-theme-default dialog-padding-top3pre'
        });
    }
    newworkError: any = {}
    isworkError = false;
    saveworkLocal(work) {
        this.newworkError = {}
        if (work == null) {
            return;
        }
        this.isworkError = false;
        if (work.employer == null || $.trim(work.employer).length <= 0) {
            this.newworkError.employer = "公司名称不能为空";
            this.isworkError = true;
        }
        if (work.start_dt == null || $.trim(work.start_dt).length <= 0) {
            this.newworkError.start_dt = "入职时间不能为空";
            this.isworkError = true;
        }
        if (work.end_dt == null || $.trim(work.end_dt).length <= 0) {
            this.newworkError.end_dt = "离职时间不能为空";
            this.isworkError = true;
        }
        var sdt = new Date(work.start_dt).getTime();
        var edt = new Date(work.end_dt).getTime();
        if (edt - sdt == NaN || edt - sdt <= 0) {
            this.newworkError.end_dt = "离职时间不能小于入职时间";
            this.isworkError = true;
        }
        if (work.dept_name == null || $.trim(work.dept_name).length <= 0) {
            // this.newworkError.dept_name = "部门不能为空";
            // this.isworkError = true;
            work.dept_name = "";
        }
        if (work.ending_title == null || $.trim(work.ending_title).length <= 0) {
            // this.newworkError.ending_title = "职位不能为空";
            // this.isworkError = true;
            work.ending_title = "";
        }
        if (this.isworkError) {
            return;
        }
        if (this.isEditwork) {
            this.oldwork.employer = work.employer,
                this.oldwork.start_dt = work.start_dt,
                this.oldwork.end_dt = work.end_dt,
                this.oldwork.dept_name = work.dept_name,
                this.oldwork.ending_title = work.ending_title,
                this.oldwork.sequence_nbr = work.sequence_nbr;
        } else {
            this.myInfo.myworks.push(work);
        }
        this.saveworkTodata();
    }

    saveworkTodata() {
        console.log("todata", this.myInfo.myworks);
        this.serBusiness.serApi.user.updateWorkEx(angular.toJson(this.myInfo.myworks)).then(x => {

            this.serHelper.ngDialog.closeAll();
            this.serHelper.toastr.info(x);
        });
    }
    willdelwork;
    deletework(item) {
        this.willdelwork = item;
        this.serHelper.delConfirm("提示", "确定要删除该工作经历吗？", "svm.isdeletework()", this.$scope);
    }
    isdeletework() {
        let item = this.willdelwork;
        console.log("正在删除", item);
        for (var i = 0; i < this.myInfo.myworks.length; i++) {
            if (item == this.myInfo.myworks[i]) {
                this.myInfo.myworks.splice(i, 1);
            }
        }
        this.saveworkTodata();
    }
    /*修改工作经历 end *********************************** */


    /*修改教育经历 start *********************************** */
    //添加 或 编辑教育经历
    neweduitem: any = {};
    isEditedu = false;
    oldEdu;
    showEditEdu(edu) {
        this.newEduError = {};
        if (edu == null) {
            this.isEditedu = false;
            this.neweduitem = {};
        }
        else {
            this.isEditedu = true;
            //this.neweduitem = edu;
            this.oldEdu = edu;
            this.neweduitem = {
                school_type_code: edu.school_type_code,
                start_dt: edu.start_dt,
                end_dt: edu.end_dt,
                school_code: edu.school_code,
                school_descr: edu.school_descr,
                degree: edu.degree,
                edu_lvl: edu.edu_lvl
            }
        }
        this.serHelper.ngDialog.open({
            template: 'templates/user/myinfo/dialog-editedu.tpl.html',
            showClose: true,
            closeByEscape: false,
            closeByDocument: false,
            width: "570px",
            scope: this.$scope,
            className: 'ngdialog-theme-default dialog-padding-top3pre',
            controller: () => {

                this.serHelper.$timeout(x => {
                    $("#schoolname_value").val(this.neweduitem.school_descr);
                    //console.log("11111", $("#schoolname_value").val());

                }, 200);
            }
        });
    }


    // //获取学校
    // schoolitems;
    // getSchool(){
    //     this.schoolitems = this.serBusiness.serApi.user.getSchool({s:"北京"});
    //     //this.bankbranchitems =  this.serBusiness.serApi.user.mypost("user/getBankBranch",{bankId:"CMB",brandName:"潍坊"});
    //     console.log("------------",this.schoolitems);
    // }
    //此处直接用bankBranchSelected()原型链作用域问题导致this.bankAccount 访问不到；
    schoolSelected = (selectitem) => {
        //console.log("aaaa", selectitem);
        if (selectitem != null && selectitem.originalObject != null) {
            this.neweduitem.school_descr = selectitem.originalObject.school_descr;
            this.neweduitem.school_code = selectitem.originalObject.school_code;
            console.log("-----", this.neweduitem);
        }
    }
    newEduError: any = {}
    isEduError = false;
    saveEduLocal(edu) {
        this.newEduError = {}
        if (edu == null) {
            return;
        }
        this.isEduError = false;
        if (edu.school_type_code == null || $.trim(edu.school_type_code).length <= 0) {
            this.newEduError.school_type_code = "学校性质不能为空";
            this.isEduError = true;
        }
        if (edu.start_dt == null || $.trim(edu.start_dt).length <= 0) {
            this.newEduError.start_dt = "入学时间不能为空";
            this.isEduError = true;
        }
        if (edu.end_dt == null || $.trim(edu.end_dt).length <= 0) {
            this.newEduError.end_dt = "毕业时间不能为空";
            this.isEduError = true;
        }
        var sdt = new Date(edu.start_dt).getTime();
        var edt = new Date(edu.end_dt).getTime();
        if (edt - sdt == NaN || edt - sdt <= 0) {
            this.newEduError.end_dt = "毕业时间不能小于入学时间";
            this.isEduError = true;
        }
        let schoolName = $('#schoolname_value').val();
        if (schoolName == null || $.trim(schoolName).length <= 0) {
            this.newEduError.school_descr = "学校名称不能为空";
            this.isEduError = true;
        } else {
            this.neweduitem.school_descr = schoolName;
            edu.shcool_descr = schoolName;
        }
        if (this.isEduError) {
            return;
        }
        if (this.isEditedu) {
            this.oldEdu.school_type_code = edu.school_type_code,
                this.oldEdu.start_dt = edu.start_dt,
                this.oldEdu.end_dt = edu.end_dt,
                this.oldEdu.school_code = edu.school_code,
                this.oldEdu.school_descr = edu.school_descr,
                this.oldEdu.degree = edu.degree,
                this.oldEdu.edu_lvl = edu.edu_lvl;
            //console.log("213", this.oldEdu);
        } else {
            this.myInfo.myedu.push(edu);
        }

        this.saveEduTodata();
    }

    saveEduTodata() {
        console.log("将要传到数据库的字符串为：", angular.toJson(this.myInfo.myedu));
        this.serBusiness.serApi.user.updateEduEx(angular.toJson(this.myInfo.myedu)).then(x => {

            this.serHelper.ngDialog.closeAll();
            this.serHelper.toastr.info(x);
        });
    }

    willdeledu;
    deleteEdu(item) {
        this.willdeledu = item;
        this.serHelper.delConfirm("提示", "确定要删除该教育经历吗？", "svm.isdeleteEdu()", this.$scope);
    }
    isdeleteEdu() {
        let item = this.willdeledu;
        //console.log("正在删除", item);
        for (var i = 0; i < this.myInfo.myedu.length; i++) {
            if (item == this.myInfo.myedu[i]) {
                this.myInfo.myedu.splice(i, 1);
            }
        }
        this.saveEduTodata();

    }

    /*修改教育经历 end *********************************** */


    /*修改家庭成员 start *********************************** */
    //添加 或 编辑家庭成员
    newfamilyitem = null;
    isEditfamily = false;
    oldFamily;
    showEditFamily(family) {
        this.newFamilyError = {};
        if (family == null) {
            this.isEditfamily = false;
            this.newfamilyitem = null
        }
        else {
            this.isEditfamily = true;
            //this.newfamilyitem = family;
            this.oldFamily = family;

            this.newfamilyitem = {
                address: family.address,
                dependent_benef: family.dependent_benef,
                phone: family.phone,
                sex: family.sex,
                name: family.name,
                relationship: family.relationship
            }
        }
        this.serHelper.ngDialog.open({
            template: 'templates/user/myinfo/dialog-editfamily.tpl.html',
            showClose: true,
            closeByEscape: false,
            closeByDocument: false,
            width: "500px",
            scope: this.$scope,
            className: 'ngdialog-theme-default dialog-padding-top3pre'
        });
    }
    newFamilyError: any = {}
    isFamilyError = false;
    saveFamilyLocal(family) {
        this.newFamilyError = {}
        if (family == null) {
            return;
        }
        this.isFamilyError = false;
        if (family.relationship == null || $.trim(family.relationship).length <= 0) {
            this.newFamilyError.relationship = "关系不能为空";
            this.isFamilyError = true;
        }
        if (family.name == null || $.trim(family.name).length <= 0) {
            this.newFamilyError.name = "姓名不能为空";
            this.isFamilyError = true;
        }
        if (family.phone != null && $.trim(family.phone).length > 0) {
            if (!this.regphone.test($.trim(family.phone))) {
                this.newFamilyError.phone = "请输入11位手机号";
                this.isFamilyError = true;
            }
        }
        // if (family.phone == null || $.trim(family.phone).length <= 0) {
        //     this.newFamilyError.phone = "电话不能为空";
        //     this.isFamilyError = true;
        // }
        if (family.address == null || $.trim(family.address).length <= 0) {
            this.newFamilyError.address = "住址不能为空";
            this.isFamilyError = true;
        }
        if (this.isFamilyError) {
            return;
        }
        if (this.isEditfamily) {
            this.oldFamily.address = family.address,
                this.oldFamily.dependent_benef = family.dependent_benef,
                this.oldFamily.phone = family.phone,
                this.oldFamily.sex = family.sex,
                this.oldFamily.name = family.name,
                this.oldFamily.relationship = family.relationship;
        } else {
            this.myInfo.myfamily.push(family);
        }
        this.saveFamilyTodata();
    }

    saveFamilyTodata() {
        console.log("将要传到数据库的字符串为：", angular.toJson(this.myInfo.myfamily));

        this.serBusiness.serApi.user.updateFamily(angular.toJson(this.myInfo.myfamily)).then(x => {

            this.serHelper.ngDialog.close();
            this.serHelper.toastr.info(x);
        });
    }
    willdelfamily;
    deleteFamily(item) {
        this.willdelfamily = item;
        this.serHelper.delConfirm("提示", "确定要删除该家庭成员吗？", "svm.isdeleteFamily()", this.$scope);
    }
    isdeleteFamily(){
        let item = this.willdelfamily;
        console.log("正在删除", item);
        for (var i = 0; i < this.myInfo.myfamily.length; i++) {
            if (item == this.myInfo.myfamily[i]) {
                this.myInfo.myfamily.splice(i, 1);
            }
        }
        this.saveFamilyTodata();
    }
    /*修改家庭成员 end *********************************** */
}
