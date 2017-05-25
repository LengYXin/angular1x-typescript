/**
 * <!-- start: Header -->
 * 标题栏
 */
import * as GlobalConfig from '../../config';
export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() { }
    scope = true;
    restrict = 'AE';
    replace = true;
    controller = Controller;
    controllerAs = "vm";
    templateUrl = 'directives/public/samHeader.tpl.html';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
        // element.find("#main-menu-toggle").click(function () { $("body").hasClass("sidebar-hide") ? $("body").removeClass("sidebar-hide") : $("body").addClass("sidebar-hide") });
    }
}
class Controller {
    static $inject = ['$scope', '$rootScope', '$element', '$http', 'serBusiness', '$state'];
    pathname: any;
    weather: any = {};
    nnReadCount = {};
    // 搜索链接地址
    remoteUrl = GlobalConfig.apiMainUrl + "home/search?s=";
    constructor(
        private $scope: ng.IScope,
        private $rootScope: ng.IRootScopeService,
        private $element: ng.IRootElementService,
        private $http: ng.IHttpService,
        private serBusiness: any,
        private $state: ng.ui.IStateService,
    ) {
        let pathname = window.location.pathname;
        this.pathname = pathname.substr(pathname.lastIndexOf('/') + 1, pathname.length);
        this.nnReadCount = this.serBusiness.serApi.message.getUnReadCount;
        //天气
        this.$http.jsonp("http://php.weather.sina.com.cn/iframe/index/w_cl.php?charset=utf-8").then(x => {
        }).catch(x => {
        }).finally(() => {
            try {
                let SWther = window["SWther"].w;
                for (var key in SWther) {
                    if (SWther.hasOwnProperty(key)) {
                        this.weather.name = key;
                        this.weather.val = SWther[key][0];
                        console.debug("天气", this.weather);
                    }
                }
            } catch (error) {
            }
        });
        // //92316ebce705404fb108b5015241158e  
        // this.$http.jsonp("https://free-api.heweather.com/v5/weather?city=beijing&key=92316ebce705404fb108b5015241158e").then(x => {
        //     console.log(x);
        // })
        // 获取地理位置
        // $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', () => {
        //     // console.log(window['remote_ip_info']);
        //     // 获取天气信息
        //     this.$http.get(`/v5/now`, { params: { city: window['remote_ip_info'].city, key: '92316ebce705404fb108b5015241158e' } }).then(x => {
        //         // console.log("object", x);
        //     });
        // });
    }
    //收缩菜单
    shrinkNav() {
        $("body").toggleClass("shrink-nav");
        this.$rootScope.$broadcast("onShrinkNav");
    }
    // 搜索选择
    countrySelected(selected) {
        console.log("选择了----", selected);
    }
    signOut() {
        window.location.href = "login.html";
    }
    keydown($event, str) {
        if ($event.keyCode == "13") {
            if (str && str.length > 0) {
                this.$state.go('public/search', ({ key: str }))
            }
        }
    };
}