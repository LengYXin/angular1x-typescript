
/**
 * 日历   http://xdsoft.net/jqplugins/datetimepicker/
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {

    }
    scope = {
        samEcharts: "="
    };
    restrict = 'AE';
    replace = true;
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: any, ctrl: any) {
        if (scope.samEcharts) {
            window["echarts"].init(element[0]).setOption(scope.samEcharts);
        }

    };
}
class Controller {
    constructor() {

    }
}
