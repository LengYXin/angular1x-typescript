
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
        samEcharts: "=",
        samMychart: "="
    };
    restrict = 'AE';
    replace = true;
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: any, ctrl: any) {
        // console.log(element);
        if (scope.samEcharts) {
            var myChart = window["echarts"].init(element[0]);
            myChart.setOption(scope.samEcharts);
            window.addEventListener("resize", x => {
                myChart.resize();
            });
            if (scope.samMychart) {
                scope.samMychart = myChart;
            }
        }

    };
}
class Controller {
    constructor() {

    }
}
