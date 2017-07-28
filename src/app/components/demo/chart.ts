import { serHelper, serBusiness } from '../../service';
/**
 * 图表
 * ng插件网址 http://jtblin.github.io/angular-chart.js/#getting_started
 * 图表网址 （英文） http://www.chartjs.org/
 * 图表网址 （中文） http://chartjs.cn/
 *                  http://www.bootcss.com/p/chart.js/docs/
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,
    ) {
        // this.$scope.$on("chart-create", (evt, chart) => {
        //     console.log(chart);
        // });
    }
    Line = new samChartConfig.Line();
    Bar = new samChartConfig.Bar();
    HorizontalBar = new samChartConfig.HorizontalBar();
    Doughnut = new samChartConfig.Doughnut();
    Radar = new samChartConfig.Radar();
    Pie = new samChartConfig.Pie();
    PolarArea = new samChartConfig.PolarArea();
    Bubble = new samChartConfig.Bubble();
    Dynamic = new samChartConfig.Dynamic();
    Barline = new samChartConfig.Barline();
}
/**
* 图表配置
*/
namespace samChartConfig {
    export class Line {
        constructor() { }
        labels = ["January", "February", "March", "April", "May", "June", "July"];
        series = ['Series A', 'Series B'];
        data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        onClick = function (points, evt) {
            console.log(points, evt);
        };
        datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };
    }
    export class Bar {
        constructor() { }
        labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        series = ['Series A', 'Series B'];
        data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
    }
    export class HorizontalBar {
        constructor() { }
        labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        series = ['Series A', 'Series B'];
        data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
    }
    export class Doughnut {
        constructor() { }
        labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        data = [300, 500, 100];
    }
    export class Radar {
        constructor() { }
        labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
        data = [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ];
    }
    export class Pie {
        constructor() { }
        labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        data = [300, 500, 100];
    }
    export class PolarArea {
        constructor() { }
        labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        data = [300, 500, 100, 40, 120];
    }
    export class Bubble {
        constructor() { }
        series = ['Series A', 'Series B'];
        data = [
            [{
                x: 40,
                y: 10,
                r: 20
            }],
            [{
                x: 10,
                y: 40,
                r: 50
            }]
        ];
    }
    export class Dynamic {
        constructor() { }
        labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
        data = [300, 500, 100, 40, 120];
        type = 'polarArea';
        toggle() {
            this.type = this.type === 'polarArea' ? 'pie' : 'polarArea';
        };
    }
    export class Barline {
        constructor() { }
        colors = ['#45b7cd', '#ff6384', '#ff8e72'];
        labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        data = [
            [65, -59, 80, 81, -56, 55, -40],
            [28, 48, -40, 19, 86, 27, 90]
        ];
        datasetOverride = [
            {
                label: "Bar chart",
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: "Line chart",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                type: 'line'
            }
        ];
    }
}