import * as GlobalConfig from '../../config';
import { serHelper, serBusiness } from '../../service';
// import { Menus } from '../../baseClass/MainMenus';

/**
 * 左侧主菜单
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {
    }
    restrict = 'AE';
    scope = true;
    replace = true;
    controller = Controller;
    controllerAs = "vm";
    templateUrl = 'directives/public/samMainMenu.tpl.html';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {

    }
}
class Controller {
    static $inject = ['$scope', '$element', 'serHelper', 'serBusiness', '$menuPermissions'];
    //菜单列表 
    Menus: any;
    //获取本地设置的语言 
    // Language: string = this.serHelper.serStorage.get("Language") || 'zh';
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        // private $translate: any,
        private serHelper: serHelper,
        private serBusiness: serBusiness,
        private $menuPermissions: any,
    ) {
        this.Menus = $menuPermissions;
        GlobalConfig.debug ? console.debug("菜单列表", this) : undefined;

        // function widthFunctions(e) {
        //     var t = $(".navbar").outerHeight(),
        //         n = $("footer").outerHeight(),
        //         r = $(window).height(),
        //         i = $(window).width();
        //     $(".sidebar-menu").css("height", r - 100);
        //     i < 992 && $("body").removeClass("sidebar-minified");
        //     i > 768 && $(".main").css("min-height", r - n)
        // }
        // $(document).ready(widthFunctions);
        // $(window).bind("resize", widthFunctions);
    }
    signOut(){
        window.location.href="/login.html";
    }
}