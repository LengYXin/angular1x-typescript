import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }

    /**
          * 精彩活动文章列表
          * @param params "type:文章类型为activity; pageIndex:页码（默认:1） pageSize:每页显示数量（默认:10）"
          */
    public queryAll(params): ng.IPromise<any> {
        params.type = "activity";
        return this.serHelper.serHTTP.getIPromise("activity/queryAll", { params: params });
    }

    /** 精彩活动文章详情*/
    private _queryById = [];
    public get queryById() {
        // let _d = {};
        // this.serHelper.serHTTP.get("/activity/queryById", { params: { id: this.serHelper.$stateParams.id } }).success(x => {
        //     angular.extend(_d, x);
        // });
        let id = this.serHelper.$stateParams.id;
        // let IPromises = this._queryById.filter(x => { return x.id == id; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("activity/queryById", { params: { id } });
        //     this._queryById.push({ id, IPromise });
        // }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }
}