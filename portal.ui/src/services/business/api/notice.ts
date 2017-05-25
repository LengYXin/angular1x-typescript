import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }
    /**
     * 获取资讯公告列表
     * @param params type为notice
     */
    public get homeQueryAll() {
        let _queryAll = [];
        this.serHelper.serHTTP.get("notice/queryAll", { params: { type: "notice", pageIndex: 1, pageSize: 5 } }).success(x => {
            angular.extend(_queryAll, x);
        });
        return _queryAll;
    }

    /**
     * 监听 方式  适用于 分页累加数据
     * @param params type为notice pageIndex:页码 pageSize:每页显示数量"
     */
    public queryAll(params): ng.IPromise<any> {
        params.type = "notice";
        return this.serHelper.serHTTP.getIPromise("notice/queryAll", { params: params });
    }
    /**
    * 获取资讯公告详情
    * @param params id 公告id
    *  这里我给解释一下为啥不用传 id 进来，
    *  this.serHelper.$stateParams  和   控制器中的 this.serHelper.$stateParams 属于同一作用域，
    *  所以这里调用   this.serHelper.$stateParams==this.serHelper.$stateParams
    */
    private _queryById = [];
    public get queryById() {
        // let _d = {};
        // this.serHelper.serHTTP.get("notice/queryById", { params: { id: this.serHelper.$stateParams.id } }).success(x => {
        //     angular.extend(_d, x);
        // });
        let id = this.serHelper.$stateParams.id;
        // let IPromises = this._queryById.filter(x => { return x.id == id; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("notice/queryById", { params: { id } });
        // this._queryById.push({ id, IPromise });
        // }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }
    // public findGuide(params): ng.IPromise<any> {
    //     params.type = "culture";
    //     return this.serHelper.serHTTP.getIPromise("home/findGuide", { params: params });
    // }
    // private _findGuide = [];
    public findGuide(type: string) {
        // let IPromises = this._queryById.filter(x => { return x.type == type; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("home/findGuide")
        //     this._queryById.push({ type, IPromise });
        // }
        let _d = [];
        IPromise.then(x => {
            angular.extend(_d, angular.fromJson(x));
        });
        return _d;
    }
    /**新人指南详情 */
    // private _guidearticle = [];
    public get findGuideById() {
        let id = this.serHelper.$stateParams.id;
        // let IPromises = this._queryById.filter(x => { return x.id == id; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("home/findGuideById", { params: { id } });
        //     this._queryById.push({ id, IPromise });
        // }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }
}