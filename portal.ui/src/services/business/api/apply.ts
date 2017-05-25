import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }

    /**
   * 申请 代表 等 数量
   */
    public get workCounts(): any {
        let _workCounts = {};
        this.serHelper.serHTTP.get("apply/my_wf_summary").success(x => {
            angular.extend(_workCounts, x);
        });
        return _workCounts;
    }
    /**
      *  提交申请接口
      * @param params "content:申请表单的内容（json）（必填） type:申请类型（必填） title:申请标题（必填） "
      */
    add(params: { content: any, type: any, title: any }): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("apply/add2", params);
    }

    //我的申请列表    
    public queryApply(_param): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("apply/queryApply", { params: _param }).success(x => {
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }

    //我的待办列表
    public queryPending(_param): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("apply/queryPending", { params: _param }).success(x => {
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }
    //根据applyid获取处理历史
    public findHandle(_param): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("apply/findHandle", { params: _param }).success(x => {
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }

    /**
     * 获取申请或待办详情
     */
    public queryById(_param): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("apply/queryById", { params: _param }).success(x => {
                                
                if(x!=null && x.content!=null){
                    x.content = $.trim(x.content).length > 0 ? this.StringToJson(x.content) : null;
                }
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }

    //获取审批流程人
    public getHandle(_applyNo?): ng.IPromise<any> {
        return this.serHelper.serHTTP.getIPromise("apply/getHandle", { params: { applyNo: _applyNo } });

    }

    /**
     * 根据id列表获取工作流列表
     */
    public queryByIds(_param): ng.IPromise<any> {
        return <any>this.serHelper.$q((r, e) => {
            this.serHelper.serHTTP.get("apply/queryByIds", { params: _param }).success(x => {
                                
                if(x!=null && x.content!=null){
                    x.content = $.trim(x.content).length > 0 ? this.StringToJson(x.content) : null;
                }
                r(x);
            }).error(x => {
                e(x);
            });
        });
    }
    
    /**
     * 提交申请处理
     */
    handlePending(_params): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("apply/handlePending", _params);
    }

    //string 转 json
    StringToJson(str) {
        try {
            return angular.fromJson(str);
        } catch (e) {
            return null;
        }
    }
}