import * as GlobalConfig from '../../config';
import { serHelper, serBusiness } from '../../service';


/**
 * 团队成员
 */

export default class directive implements ng.IDirective {
    static $instance =  (): ng.IDirective => {
        return new directive();
    };
    constructor() {}
    restrict = 'AE';
    replace = true;
    templateUrl = 'directives/mg&hr/samTeamMember.tpl.html';
    // controller = Controller;
    // controllerAs = "vm";
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {

    }
}
class Controller {
    static $inject = ['$scope', '$element', 'serHelper'];
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private serHelper: serHelper
    ) {

    }
}
