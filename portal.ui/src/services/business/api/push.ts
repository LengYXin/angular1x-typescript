import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    };

    /**
    * 添加印象标签
    */
    public addTag(tagContent): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("/push/addTag", { tagContent });
    }

    /**
    * 获取所有印象标签
    */
    public get queryTag() {
        return this.serHelper.serHTTP.getIPromise("/push/queryTag");
    }
     /**
     * 获取印象标签列表
     * /push/queryTagList

     */
    public get queryTagList() {
        // params.type = "social";
        let _d = [];
        this.serHelper.serHTTP.getIPromise("/push/queryTagList").then(x => {
            angular.extend(_d, angular.fromJson(x));
        });
        return _d;
    }
    /**
     * 内推明星
     */
    public get findPush() {
        // params.type = "social";
        let _d = [];
        this.serHelper.serHTTP.getIPromise("/push/findPush").then(x => {
            angular.extend(_d, angular.fromJson(x));
        });
        return _d;
    }

    /**
     * 内推明星点赞、取消赞
     */
    public updateLikeCount(_params): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("push/updateLikeCount", _params);
    }

    //内推文章
    _findPusharticle = [];
    public findPusharticle(type: string) {
        let IPromises = this._findPusharticle.filter(x => { return x.type == type; });
        let IPromise: ng.IPromise<any>;
        if (IPromises.length) {
            IPromise = IPromises[0].IPromise;
        } else {
            IPromise = this.serHelper.serHTTP.getIPromise("/push/findPusharticle")
            this._findPusharticle.push({ type, IPromise });
        }
        let _d = [];
        IPromise.then(x => {
            angular.extend(_d, angular.fromJson(x));
        });
        return _d;
    }


    //内推文章详情
    private _pusharticle = [];
    public get findById() {
        let id = this.serHelper.$stateParams.id;
        // let IPromises = this._pusharticle.filter(x => { return x.id == id; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("push/findById", { params: { id } });
        //     this._pusharticle.push({ id, IPromise });
        // }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }


    //string 转 json[]
    StringToJson(str) {
        try {
            return angular.fromJson(str);
        } catch (e) {
            return [];
        }
    }


}