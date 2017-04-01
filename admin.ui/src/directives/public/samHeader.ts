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
    templateUrl = 'directives/samHeader.tpl.html';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
        // element.find("#main-menu-toggle").click(function () { $("body").hasClass("sidebar-hide") ? $("body").removeClass("sidebar-hide") : $("body").addClass("sidebar-hide") });
    }
}
class Controller {
    static $inject = ['$scope', '$element'];
    pathname: any;
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
    ) {
        let pathname = window.location.pathname;
        this.pathname = pathname.substr(pathname.lastIndexOf('/') + 1, pathname.length);
    }
}