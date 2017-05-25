import { serHelper, serBusiness } from '../../service';

/**
 * 消息
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = ["pageIndex"];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        this.serBusiness.serApi.message.findAll(this.pagingConfig1.params).then(x => {
            this.pagingConfig1.item = x;
        })
        this.serBusiness.serApi.message.findAll(this.pagingConfig2.params).then(x => {
            this.pagingConfig2.item = x;
        });
        console.log(this);
    }
    pagingConfig1 = {
        item: [],
        params: {
            isRead: 0,
            pageIndex: this.serHelper.$stateParams.pageIndex,
            pageSize: 20
        },
        //启用地址 默认 false
        // state: true,
        onCallback: (x, c) => {
            this.serBusiness.serApi.message.findAll(this.pagingConfig1.params).then(x => {
                c(x);
            });
        }
    };
    pagingConfig2 = {
        item: [],
        params: {
            isRead: 1,
            pageIndex: this.serHelper.$stateParams.pageIndex,
            pageSize: 20
        },
        //启用地址 默认 false
        // state: true,
        onCallback: (x, c) => {
            this.serBusiness.serApi.message.findAll(this.pagingConfig2.params).then(x => {
                c(x);
            });
        }
    };
    /**
     * knowledge  ------- 鑫知识库文章
    notice ----------- 公告文章
    culture ---------- 文化文章
    activity --------- 精彩活动文章
    pusharticle ------ 内推宝典文章
    guide ------------ 新人指南文章
    welfarecar ------- 福利购车文章
    
     * @param t 
     */
    goMessage(t) {
        console.log("object", t);
        if (t.isRead == 0) {
            this.serBusiness.serApi.message.markToRead(t.id);
        }
        let url = "";
        switch (t.type) {
            case "consultation"://咨询
                url = "public/consult";
                break;
            case "feedback"://反馈
                url = "public/feedback";
                break;
            case "knowledge":
                url = "a/ad";
                break;
            case "notice":
                url = "public/noticedtl";
                break;
            case "culture":
                url = "public/culturedtl";
                break;
            case "activity":
                url = "ser/inside/ad";
                break;
            case "pusharticle":
                url = "ser/push/ad";
                break;
            case "guide":
                url = "public/guidearticle";
                break;
            // case "welfarecar":
            //     break;
            default:
                break;
        }
        this.serHelper.$state.go(url, { id: t.fromId });
    }
}
