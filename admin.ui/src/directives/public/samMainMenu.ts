import * as GlobalConfig from '../../config';
import { serHelper, serBusiness } from '../../service';
import { Menus } from '../../baseClass/MainMenus';

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
    // transclude = true;
    replace = true;
    // controller = ["serHelper", function (serHelper: serHelper) {
    //     //菜单列表 
    //     this.Menus = Menus;
    //     // serHelper.serHTTP.get('')
    //     // console.log("samMainMenu", this);
    // }];
    controller = Controller;
    controllerAs = "vm";
    templateUrl = 'directives/samMainMenu.tpl.html';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {

    }
}
class Controller {
    static $inject = ['$scope', '$element', 'serHelper', 'serBusiness'];
    //菜单列表 
    Menus: any;
    //获取本地设置的语言 
    Language: string = this.serHelper.serStorage.get("Language") || 'zh';
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        // private $translate: any,
        private serHelper: serHelper,
        private serBusiness: serBusiness,

    ) {
        this.Menus = Menus;
        console.log(" this.Menus", this.Menus);
        // this.Menus = this.serBusiness.serUser.Menus;
        // console.log(this.Menus);
        // console.log("samMainMenu",this.$scope);
        // sys/MenuList
        // this.serHelper.serHTTP.get("sys/MenuListByUser").success((r: any) => {
        //     var all = {}, tree = [];
        //     for(var idx in r){
        //         var menu = r[idx];
        //         all[menu.MenuId] = menu;
        //     }

        //     for(var idx in r){
        //         var menu = r[idx];
        //         var p = (menu.ParentId && all[menu.ParentId])? all[menu.ParentId].Menus : tree;
        //         p.push(menu);
        //     }
        //     this.Menus = tree;
        //     this.Menus = this.Menus.concat(Menus);
        //     //执行 移植的js代码
        //     setTimeout(function () {
        //         window["samAdminLoad"]();
        //     }, 500);
        // });
        function widthFunctions(e) {
            $(".timeline") && $(".timeslot").each(function () {
                var e = $(this).find(".task").outerHeight();
                $(this).css("height", e)
            });
            var t = $(".navbar").outerHeight(),
                n = $("footer").outerHeight(),
                r = $(window).height(),
                i = $(window).width();
            $(".sidebar-menu").css("height", r - 60);
            i < 992 && $("body").removeClass("sidebar-minified");
            i > 768 && $(".main").css("min-height", r - n)
        }
        $(document).ready(widthFunctions);
        $(window).bind("resize", widthFunctions);
    }
    //切换语言
    switchLanguage() {
        this.Language = this.Language === 'zh' ? 'en' : 'zh';
        this.serHelper.serStorage.set("Language", this.Language);
        // this.$translate.use(this.Language);
    }
}