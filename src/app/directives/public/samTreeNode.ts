
/**
 * Tree 树
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {
    }
    scope = false;
    restrict = 'AE';
    replace = true;
    // controller = Controller;
    // controllerAs = "vm";
    templateUrl = function (element, attr) {
        return attr.templateurl;
    };
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
    };
}
class Controller {
    constructor() {

    }
}
