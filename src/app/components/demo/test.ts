import { serHelper, serBusiness } from '../../service';

/**
 * 首页控制器
 */
//export let controllersName: string = "DomeForme";
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
    //路由参数
    static $stateParams = [];

    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {

    }
    longurl = "";
    shorturl = "";
    clickShortUrl() {

        // if ($.trim(this.longurl).length <= 0) {
        //     return;
        // }
        // this.serHelper.serHTTP.get(
        //     "http://api.t.sina.com.cn/short_url/shorten.json?source=3213676317&url_long=http://www.cnblogs.com/e241138"
        // ).success(x => {
        //     console.log("我是短链", x);
        // }).error(x => {
        //     console.log("我是短链错误", x);
        // });

        $.ajax({
            type:"get",
            url: "http://api.t.sina.com.cn/short_url/shorten.json?source=3213676317&url_long=http://www.cnblogs.com/e241138",
            success: (r) => {
                console.log("我是短链", r);
            },
            error: (e) => {
                console.log("我是短链错误", e);

            }
        })
    }
}
