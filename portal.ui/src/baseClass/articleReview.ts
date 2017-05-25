import { serHelper, serBusiness } from '../service';

/**
 * 文章评论
 * 评论方法
 * 获取评论数据
 * 分页配置
 */
export default class controllers {
    //angular 注入   
    // static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    // static $stateParams = ["id"];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
    }
    details;
    addpushLike(star) {
        if (star.isLike == "是") {
            star.isLike = "否";
            star.like_count--;
        }
        else {
            star.isLike = "是";
            star.like_count++;
        }
        this.serBusiness.serApi.knowledge.updateLikeCount(star.article_id);
    }
    submit(details, type, toCommentId = 0) {
        if (details.Editor && details.Editor.length > 0 && details.Editor != '<p><br></p>') {
            details.submitBtnState = true;
            this.serBusiness.serApi.knowledge.commentAdd(
                {
                    articleId: this.details.article_id,
                    type: type,
                    comment: details.Editor,
                    toCommentId: toCommentId
                }
            ).then(x => {
                this.details.comment_count++;
                details.Editor = "";
                details.EditorShow = false;
                details.submitBtnState = false;
                this.init();
            }).catch(x => {
                details.submitBtnState = false;
            });
        } else {
            this.serHelper.toastr.warning('没有填写内容!', '', { timeOut: 500, allowHtml: true });
        }
    }
    // 分页配置
    pagingConfig = {
        //数据存储集合
        item: [],
        //参数
        params: {
            articleId: this.serHelper.$stateParams.id,
            pageIndex: 1,
            // pageSize: 1
        },
        //启用地址 默认 false
        // state: true,
        onCallback: (x, c) => {
            this.serBusiness.serApi.knowledge.commentFindAllByArticleId(this.pagingConfig.params).then(x => {
                c(x);
            });
        }
    };
    init() {
        this.serBusiness.serApi.knowledge.commentFindAllByArticleId(this.pagingConfig.params).then(x => {
            this.pagingConfig.item = x;
        });
    }
}
