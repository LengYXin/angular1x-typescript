import { serHelper, serBusiness, articleReview } from '../../service';

/**
 * 福利免息购车
 */
export default class controllers extends articleReview {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        super($scope, serHelper, serBusiness);

        this.serBusiness.serApi.self.findWelfarecar.then(x => {
            this.details = x;
            this.pagingConfig.params.articleId = this.details.article_id;
            // this.init();
        });
        console.log("福利", this);
    }
    // type:文章类型为welfarecar
    details;
    // 关闭评论
    CommentClose = true;
}
