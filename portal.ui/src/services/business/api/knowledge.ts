import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }
    private _knowledgelist = [];
    /**
    * 鑫知识库首页列表接口
    */
    public get articlelist(): any[] {
        if (this._knowledgelist.length < 1) {
            this.serHelper.serHTTP.get("knowledge/article/list").success(x => {
                angular.extend(this._knowledgelist, x[0].Menus);
            });
        }
        return this._knowledgelist;
    }
    /**
    * 鑫知识库文章详情
    */
    public get articleFindById() {
        // let _d = {};
        // this.serHelper.serHTTP.get("knowledge/article/findById", { params: { id: this.serHelper.$stateParams.id } }).success(x => {
        //     angular.extend(_d, x);
        // });
        // return _d;
        let id = this.serHelper.$stateParams.id;
        // let IPromises = this._articleFindById.filter(x => { return x.id == id; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("knowledge/article/findById", { params: { id } });
        //     this._articleFindById.push({ id, IPromise });
        // }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }
    // 缓存异步数据对象
    private _articleFindById = [];
    /**
        * 获取文章评论
        */
    public commentFindAllByArticleId(params) {
        params.articleId = params.articleId ? params.articleId : this.serHelper.$stateParams.id
        return this.serHelper.serHTTP.getIPromise("/knowledge/comment/findAllByArticleId", { params: params });;
    }
    /**
       *  评论及回复接口
       * @param "toCommentId:被回复评论的id(评论则为0) articleId:所属文章id comment:评论内容 "
       */
    commentAdd(params: { articleId: number, type: any, comment: any, toCommentId: number }): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("/knowledge/comment/add", {
            articleId: params.articleId,
            type: params.type,
            comment: params.comment,
            toCommentId: params.toCommentId
        });

    }
    /**
    * 文章点赞接口
    */
    public updateLikeCount(id): ng.IPromise<any> {
        // let IPromises = this._articleFindById.filter(x => { return x.id == id; });
        // let IPromise: any;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        //     if (IPromise.$$state.value.isLike == "是") {
        //         IPromise.$$state.value.isLike = "否";
        //         IPromise.$$state.value.like_count--;
        //     }
        //     else {
        //         IPromise.$$state.value.isLike = "是";
        //         IPromise.$$state.value.like_count++;
        //     }
        // }
        return this.serHelper.serHTTP.postIPromise("/knowledge/article/updateLikeCount", { id: id });
    }
}