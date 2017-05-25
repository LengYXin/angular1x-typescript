import { serHelper, serBusiness } from '../../../service';

/**
 * 首页控制器
 */

export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
    ) {
        console.log("teamProfile", this);
    }
    nowdate = new Date();
    option = {
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['0,24', '25,29', '30,34', '35,40', '40,49']
        },
        grid: {
            top: "5%",
            right: "15%"
        },
        color: ['#598598', '#49b29b', '#6C6FBF', '#749bdc', '#24a8d1'],
        xAxis: {
            // boundaryGap: true,
            data: ['员工年龄分布'],

            axisTick: {
                show: false
            }

        },
        yAxis: {
            axisLine: {
                show: true
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                },
                linestyle: {
                    color: '#faf'
                }
            }
        },
        barGap: '100%',

        series: [
            {
                name: '0,24',
                type: 'bar',
                data: [20],
                barWidth: 20,
            }, {
                name: '25,29',
                type: 'bar',
                data: [120],
                barWidth: 20
            }, {
                name: '30,34',
                type: 'bar',
                data: [220],
                barWidth: 20
            }, {
                name: '35,40',
                type: 'bar',
                data: [320],
                barWidth: 20
            }, {
                name: '40,49',
                type: 'bar',
                data: [420],
                barWidth: 20
            }
        ]

    };
    option1 = {
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['大专', '本科', '硕士', '博士']
        },
        grid: {
            top: "5%",
            right: "15%"
        },
        color: ['#598598', '#49b29b', '#6C6FBF', '#749bdc', '#24a8d1'],
        xAxis: {
            data: ['员工学历分布']
        },
        yAxis: {
            axisLine: {
                show: true,

                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    },
                    linestyle: {
                        color: '#faf'
                    },

                }
            }
        },
        barGap: '100%',
        series: [{
            name: '大专',
            type: 'bar',
            data: [20],
            barWidth: 20
        }, {
            name: '本科',
            type: 'bar',
            data: [120],
            barWidth: 20
        }, {
            name: '硕士',
            type: 'bar',
            data: [220],
            barWidth: 20
        }, {
            name: '博士',
            type: 'bar',
            data: [320],
            barWidth: 20
        }, //{
            //     name: '40,49',
            //     type: 'bar',
            //     data: [420],
            //     barWidth:20
            // },
        ]
    };
    option2 = {
        title: {
            text: '在职人数',
            x: 'left'
        },

        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['女性', '男性']
        },
        color: ['#E9666C', '#598598'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 295, name: '女性' },
                    { value: 350, name: '男性' },

                ]
            }
        ]
    };


    test: string = "哈哈哈 我是测试的 page1"
}
