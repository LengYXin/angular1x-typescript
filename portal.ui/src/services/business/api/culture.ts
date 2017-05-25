import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }
    /**
     * 获取最新一条文化
     * @param params 文章类型为culture
     */
    public get last() {
        let _last = {};
        this.serHelper.serHTTP.get("culture/last1", { params: { type: "culture" } }).success(x => {
            angular.extend(_last, angular.fromJson(x));
        });
        return _last;
    }
    /**
         * 监听 方式  适用于 分页累加数据
         * @param params type为culture pageIndex:页码 pageSize:每页显示数量"
         */
    public queryAll(params): ng.IPromise<any> {
        params.type = "culture";
        return this.serHelper.serHTTP.getIPromise("culture/queryAll", { params: params });
    }
    /**
   * 获取文化详情
   * @param params id 文化id
   *  这里我给解释一下为啥不用传 id 进来，
   *  this.serHelper.$stateParams  和   控制器中的 this.serHelper.$stateParams 属于同一作用域，
   *  所以这里调用   this.serHelper.$stateParams==this.serHelper.$stateParams
   */
    public get queryById() {
        // let _d = {};
        // this.serHelper.serHTTP.get("culture/queryById", { params: { id: this.serHelper.$stateParams.id } }).success(x => {
        //     angular.extend(_d, x);
        // });
        let id = this.serHelper.$stateParams.id;
        // let IPromises = this._queryById.filter(x => { return x.id == id; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("culture/queryById", { params: { id } });
        //     this._queryById.push({ id, IPromise });
        // }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }
    private _queryById = [];
}