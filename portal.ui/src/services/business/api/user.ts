import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    };


    /**
     * 获取用户信息
     */
    private _myInfo = { myinfo: null };
    public get findInfo(): any {
        if (this._myInfo.myinfo == null) {
            //,{params:{uid:1}}
            this.serHelper.serHTTP.get("user/findInfo").success(r => {
                this.myInfo(r);
            });
        }
        return this._myInfo;
    }
    private myInfo(r) {
        var result = {};
        if (r != null && r.length > 1) {
            var Myinfo = r[0];
            var Myotherinfo = r[1];
            var myfamily = $.trim(Myotherinfo.family).length > 0 ? this.StringToJson(Myotherinfo.family) : null;
            var myworks = $.trim(Myotherinfo.work).length > 0 ? this.StringToJson(Myotherinfo.work) : null;
            var myedu = $.trim(Myotherinfo.edu).length > 0 ? this.StringToJson(Myotherinfo.edu) : null;
            var mycontract = $.trim(Myotherinfo.contract).length > 0 ? this.StringToJson(Myotherinfo.contract) : null;
            var myjoblvl = $.trim(Myotherinfo.joblvl).length > 0 ? this.StringToJson(Myotherinfo.joblvl) : null;
            result = { myinfo: Myinfo, joblvl: myjoblvl, myfamily: myfamily, myworks: myworks, myedu: myedu, mycontract: mycontract };
        }
        angular.extend(this._myInfo, result);
        console.log("_myInfo", this._myInfo);

    }

    //string 转 json[]
    StringToJson(str) {
        try {
            return angular.fromJson(str);
        } catch (e) {
            return [];
        }
    }

    /**
        * 获取用户信息
        */
    public get findInfo_myinfo(): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            if (this._myInfo.myinfo == null) {
                this.serHelper.serHTTP.get("user/findInfo").success(x => {
                    r(x[0]);
                    this.myInfo(x);
                }).error(x => {
                    e(x);
                });
            } else {
                r(this._myInfo.myinfo);
            }
        });
    }


    /**
     * 获取支行
     */
    ;
    public getBankBranch(_params) {
        let _bankbranch = [];
        this.serHelper.serHTTP.get("user/getBankBranch", { params: _params }).success(r => {
            console.log("-------------------getBankBranch1", r);

            angular.extend(_bankbranch, r);
            console.log(_bankbranch);
            console.log("-------------------getBankBranch2")
        });
        return _bankbranch;
    }

    /**
     * 获取学校
     */
    ;
    public getSchool(_params) {
        let _school = [];
        this.serHelper.serHTTP.get("user/searchSchool", { params: _params }).success(r => {
            console.log("-------------------searchSchool    ", r);

            angular.extend(_school, r);
            console.log(_school);
            console.log("-------------------searchSchoolq")
        });
        return _school;
    }


    //保存头像
    updateAvatar(_avatar): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.post("user/updateAvatar", { avatar: _avatar }).success(x => {
                r(x);
                this.serHelper.serHTTP.get("user/refreshContext");
            }).error(x => {
                e(x);
            });
        });
    }


    /**
     *  修改手机号
     * @param _newTel 新手机号
     */
    updateMobile(_newTel): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("user/updateMobile", { mobile: _newTel });
    }
    /**
     *  修改紧急联系人
     * @param _newcontactName 新紧急联系人姓名
     * @param _newcontactPhone 新紧急联系人电话
     */
    updateContactInfo(_newcontactName, _newcontactPhone): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("user/updateContactInfo",
            { contactName: _newcontactName, contactPhone: _newcontactPhone });
    }



    /**
     *  修改工作经历
     */
    updateWorkEx(_works): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("/user/updateWorkEx", { work: _works });
    }

    /**
     *  修改教育经历
     */
    updateEduEx(_edus): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("/user/updateEduEx", { edu: _edus });
    }

    /**
     *  修改家庭成员
     */
    updateFamily(_families): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("/user/updateFamily", { family: _families });
    }





    /**
     * outlook日历
     */
    // public calendar(): ng.IPromise<any> {
    //     return this.serHelper.serHTTP.getIPromise("user/calendar");

    // }
    public calendar(): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("user/calendar").success(x => {
                try {
                    let today = new Date();
                    var nowMtime = (new Date(today.getFullYear(), today.getMonth(), today.getDate())).getTime();
                    for (var i = 0; i < x.length; i++) {
                        if (x[i].end - nowMtime < 0) {
                            x[i].class = "event-inverse";
                        }
                    }
                } catch (error) {
                    x = null;
                    console.error(error);
                }
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }
    /**
     * 经理中心团队成员搜索列表
     * @param uid 员工编号（当前用户时不用传）
     */
    // 缓存异步数据对象
    private _getTeamMember = [];
    public getTeamMember(uid?): ng.IPromise<any> {
        let IPromises = this._getTeamMember.filter(x => { return x.uid == uid; });
        if (IPromises.length) {
            return IPromises[0].IPromise;
        } else {
            let IPromise = this.serHelper.serHTTP.getIPromise("user/getTeamMember", { params: { uid: uid } });
            this._getTeamMember.push({ uid, IPromise });
            return IPromise;
        }
    }

    /**
       * 获取居住证信息
       */
    public getResidence(): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("user/getResidence").success(x => {
                try {
                    x = x[0];
                } catch (error) {
                    x = null;
                    console.error(error);
                }
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }
    /**
     * 经理中心团队成员搜索列表
    */
    private _search = [];
    public search(s: string): ng.IPromise<any> {
        let IPromises = this._search.filter(x => { return x.s == s; });
        if (IPromises.length) {
            return IPromises[0].IPromise;
        } else {
            let IPromise = this.serHelper.serHTTP.getIPromise("/user/search", { params: { s: s } });
            this._search.push({ s, IPromise });
            return IPromise;
        }
    }
    /**
     * 获取用户信息
     * emplid：员工id
     */
    // 缓存异步数据对象
    private _findUserByEmplid = [];
    public findUserByEmplid(emplid) {
        let IPromises = this._findUserByEmplid.filter(x => { return x.emplid == emplid; });
        let IPromise: ng.IPromise<any>;
        if (IPromises.length) {
            IPromise = IPromises[0].IPromise;
        } else {
            IPromise = this.serHelper.serHTTP.getIPromise("/user/findUserByEmplid", { params: { emplid: emplid } });
            this._findUserByEmplid.push({ emplid, IPromise });
        }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }


    
    //全局搜索 用户 
    public findUser(_param): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("home/findUser", { params: _param }).success(x => {
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }

    
    
    //全局搜索文章
    public findArticle(_param): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("home/findArticle", { params: _param }).success(x => {
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }

}