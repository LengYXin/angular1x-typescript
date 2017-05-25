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
    option = {
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['0,24', '25,29', '30,34', '35,40', '40,49']
        },
        xAxis: {
            data: ['员工年龄分布']
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        series: [{
            name: '0,24',
            type: 'bar',
            data: [20]
        }, {
            name: '25,29',
            type: 'bar',
            data: [120]
        }, {
            name: '30,34',
            type: 'bar',
            data: [220]
        }, {
            name: '35,40',
            type: 'bar',
            data: [320]
        }, {
            name: '40,49',
            type: 'bar',
            data: [420]
        }]
    };
    option1 = {
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['0,24', '25,29', '30,34', '35,40', '40,49']
        },
        xAxis: {
            data: ['员工学历分布']
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            }
        },
        series: [{
            name: '0,24',
            type: 'bar',
            data: [20]
        }, {
            name: '25,29',
            type: 'bar',
            data: [120]
        }, {
            name: '30,34',
            type: 'bar',
            data: [220]
        }, {
            name: '35,40',
            type: 'bar',
            data: [320]
        }, {
            name: '40,49',
            type: 'bar',
            data: [420]
        }]
    };
    option2 = {
        title: {
            text: '在职人数',
            x: 'left'
        },
        
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ['男性', '女性']
        },
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
                    { value: 335, name: '男性' },
                    { value: 310, name: '女性' },
                ]
            }
        ]
    };
    option3 = {
        title: {
        },
        backgroundColor: '#F7F7F7',
        tooltip: {
            show: true
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    iconStyle: {
                        normal: {
                            color: '#FFFFFF'
                        }
                    }
                }
            }
        },
        series: [{
            name: '热点分析',
            type: 'wordCloud',
            //size: ['9%', '99%'],
            sizeRange: [6, 66],
            //textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 6
            },
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: [{
                name: "Jayfee",
                value: 666
            }, {
                name: "Nancy",
                value: 520
            }, {
                name: "生活资源",
                value: "999"
            }, {
                name: "供热管理",
                value: "888"
            }, {
                name: "供气质量",
                value: "777"
            }, {
                name: "生活用水管理",
                value: "688"
            }, {
                name: "一次供水问题",
                value: "588"
            }, {
                name: "交通运输",
                value: "516"
            }, {
                name: "城市交通",
                value: "515"
            }, {
                name: "环境保护",
                value: "483"
            }, {
                name: "房地产管理",
                value: "462"
            }, {
                name: "城乡建设",
                value: "449"
            }, {
                name: "社会保障与福利",
                value: "429"
            }, {
                name: "社会保障",
                value: "407"
            }, {
                name: "文体与教育管理",
                value: "406"
            }, {
                name: "公共安全",
                value: "406"
            }, {
                name: "公交运输管理",
                value: "386"
            }, {
                name: "出租车运营管理",
                value: "385"
            }, {
                name: "供热管理",
                value: "375"
            }, {
                name: "市容环卫",
                value: "355"
            }, {
                name: "自然资源管理",
                value: "355"
            }, {
                name: "粉尘污染",
                value: "335"
            }, {
                name: "噪声污染",
                value: "324"
            }, {
                name: "土地资源管理",
                value: "304"
            }, {
                name: "物业服务与管理",
                value: "304"
            }, {
                name: "医疗卫生",
                value: "284"
            }, {
                name: "粉煤灰污染",
                value: "284"
            }, {
                name: "占道",
                value: "284"
            }, {
                name: "供热发展",
                value: "254"
            }, {
                name: "农村土地规划管理",
                value: "254"
            }, {
                name: "生活噪音",
                value: "253"
            }, {
                name: "供热单位影响",
                value: "253"
            }, {
                name: "城市供电",
                value: "223"
            }, {
                name: "房屋质量与安全",
                value: "223"
            }, {
                name: "大气污染",
                value: "223"
            }, {
                name: "房屋安全",
                value: "223"
            }, {
                name: "文化活动",
                value: "223"
            }, {
                name: "拆迁管理",
                value: "223"
            }, {
                name: "公共设施",
                value: "223"
            }, {
                name: "供气质量",
                value: "223"
            }, {
                name: "供电管理",
                value: "223"
            }, {
                name: "燃气管理",
                value: "152"
            }, {
                name: "教育管理",
                value: "152"
            }, {
                name: "医疗纠纷",
                value: "152"
            }, {
                name: "执法监督",
                value: "152"
            }, {
                name: "设备安全",
                value: "152"
            }, {
                name: "政务建设",
                value: "152"
            }, {
                name: "县区、开发区",
                value: "152"
            }, {
                name: "宏观经济",
                value: "152"
            }, {
                name: "教育管理",
                value: "112"
            }, {
                name: "社会保障",
                value: "112"
            }, {
                name: "生活用水管理",
                value: "112"
            }, {
                name: "物业服务与管理",
                value: "112"
            }, {
                name: "分类列表",
                value: "112"
            }, {
                name: "农业生产",
                value: "112"
            }, {
                name: "二次供水问题",
                value: "112"
            }, {
                name: "城市公共设施",
                value: "92"
            }, {
                name: "拆迁政策咨询",
                value: "92"
            }, {
                name: "物业服务",
                value: "92"
            }, {
                name: "物业管理",
                value: "92"
            }, {
                name: "社会保障保险管理",
                value: "92"
            }, {
                name: "低保管理",
                value: "92"
            }, {
                name: "文娱市场管理",
                value: "72"
            }, {
                name: "城市交通秩序管理",
                value: "72"
            }, {
                name: "执法争议",
                value: "72"
            }, {
                name: "商业烟尘污染",
                value: "72"
            }, {
                name: "占道堆放",
                value: "71"
            }, {
                name: "地上设施",
                value: "71"
            }, {
                name: "水质",
                value: "71"
            }, {
                name: "无水",
                value: "71"
            }, {
                name: "供热单位影响",
                value: "71"
            }, {
                name: "人行道管理",
                value: "71"
            }, {
                name: "主网原因",
                value: "71"
            }, {
                name: "集中供热",
                value: "71"
            }, {
                name: "客运管理",
                value: "71"
            }, {
                name: "国有公交（大巴）管理",
                value: "71"
            }, {
                name: "工业粉尘污染",
                value: "71"
            }, {
                name: "治安案件",
                value: "71"
            }, {
                name: "压力容器安全",
                value: "71"
            }, {
                name: "身份证管理",
                value: "71"
            }, {
                name: "群众健身",
                value: "41"
            }, {
                name: "工业排放污染",
                value: "41"
            }, {
                name: "破坏森林资源",
                value: "41"
            }, {
                name: "市场收费",
                value: "41"
            }, {
                name: "生产资金",
                value: "41"
            }, {
                name: "生产噪声",
                value: "41"
            }, {
                name: "农村低保",
                value: "41"
            }, {
                name: "劳动争议",
                value: "41"
            }, {
                name: "劳动合同争议",
                value: "41"
            }, {
                name: "劳动报酬与福利",
                value: "41"
            }, {
                name: "医疗事故",
                value: "21"
            }, {
                name: "停供",
                value: "21"
            }, {
                name: "基础教育",
                value: "21"
            }, {
                name: "职业教育",
                value: "21"
            }, {
                name: "物业资质管理",
                value: "21"
            }, {
                name: "拆迁补偿",
                value: "21"
            }, {
                name: "设施维护",
                value: "21"
            }, {
                name: "市场外溢",
                value: "11"
            }, {
                name: "占道经营",
                value: "11"
            }, {
                name: "树木管理",
                value: "11"
            }, {
                name: "农村基础设施",
                value: "11"
            }, {
                name: "无水",
                value: "11"
            },]
        }]
    };

    test: string = "哈哈哈 我是测试的 page1"
}
