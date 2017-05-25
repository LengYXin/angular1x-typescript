import { serHelper, serBusiness } from '../../service';

/**
 * 搜索
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = ["key"];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        this.getsearch();
    }
    //emoteUrl = "/api/home/search&s="
    params: any = {
        article: { pageIndex: 0, pageSize: 5, lastLength: 5, s: "" },
        user: { pageIndex: 0, pageSize: 5, lastLength: 5, s: "" }
    };
    result: any = { article: [], user: [] };
    getsearch() {
        let key = this.serHelper.$stateParams.key;
        if (key == null || $.trim(key).length <= 0) {
            return;
        }

        this.params.user.s = key;
        this.moreUser();

        this.params.article.s = key;
        this.moreArticle();
    }

    moreUser() {
        ++this.params.user.pageIndex;
        this.serBusiness.serApi.user.findUser(this.params.user).then(x => {
            //console.log("x", x);
            if (x == null || x.length <= 0) {
                //this.serHelper.toastr.info("没有更多用户", "", { timeOut: 1000, allowHtml: true });
                this.params.user.lastLength = 0;
                return;
            }
            this.params.user.lastLength = x.length;
            this.result.user = this.result.user.concat(x);
        });

    }

    moreArticle() {
        ++this.params.article.pageIndex;
        this.serBusiness.serApi.user.findArticle(this.params.article).then(x => {
            //console.log("x", x);
            if (x == null || x.length <= 0) {
                //this.serHelper.toastr.info("没有更多文章", "", { timeOut: 1000, allowHtml: true });
                this.params.article.lastLength = 0;
                return;
            }
            this.params.article.lastLength = x.length;
            this.result.article = this.result.article.concat(x);
        });
    }

    openarticle(article) {
        console.log("点击了", article);
    }


    resultSelected(selected) {
        console.log("object", selected);
    }
}
