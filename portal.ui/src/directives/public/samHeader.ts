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
    static $inject = ['$scope', '$element', 'serHelper'];
    pathname: any;
    weather: any = {};
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private serHelper: any
    ) {
        let pathname = window.location.pathname;
        this.pathname = pathname.substr(pathname.lastIndexOf('/') + 1, pathname.length);
        //天气
        this.serHelper.$http.jsonp("http://php.weather.sina.com.cn/iframe/index/w_cl.php?charset=utf-8").success(x => {
            let SWther = window["SWther"].w;
            for (var key in SWther) {
                if (SWther.hasOwnProperty(key)) {
                    this.weather.name = key;
                    this.weather.val = SWther[key][0];
                    console.debug("天气",this.weather);
                }
            }
        })
    }
}