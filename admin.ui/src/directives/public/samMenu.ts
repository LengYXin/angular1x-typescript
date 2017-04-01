import * as GlobalConfig from '../../config';
import { serHelper, serBusiness } from '../../service';


/**
 * 菜单
 */

export default class directive implements ng.IDirective {
    static $instance = ['$rootScope', ($rootScope): ng.IDirective => {
        return new directive($rootScope);
    }];
    constructor(
        private $rootScope: ng.IRootScopeService
    ) {
    }
    restrict = 'AE';
    replace = true;
    templateUrl = 'directives/samMenu.tpl.html';
    controller = Controller;
    controllerAs = "vm";
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {

    }
}
class Controller {
    static $inject = ['$scope', '$element', 'serHelper'];
    //菜单列表 
    Menus: any[];
    $ul: JQuery = null;
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private serHelper: serHelper
    ) {

    }
    openedShow($event) {
        if (this.$ul === null) {
            this.$ul = this.$element.children("ul");
        }
        if (this.$ul.length == 0) {
            return;
        }
        this.$element.hasClass("opened") ? this.$element.removeClass("opened") : this.$element.addClass("opened");
        this.$ul.first().stop().slideToggle("normal", function () { });
        // this.$element.parent().parent().hasClass("opened");
    }
}
