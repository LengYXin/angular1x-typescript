import { serHelper, serBusiness } from '../../service';

/**
 * 富文本
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

    }
    onadd(t) {
        console.log("添加", t);
        t.Menus.push({
            "MenuName": "首页",
            "MenuUrl": "home",
            "Menus": [],
        }, );
    };
    Menus = [
        {
            "MenuName": "首页",
            "MenuUrl": "home",
            "Menus": [],
        },
        {
            "MenuName": "个人中心",
            "MenuUrl": "personal",
            "Menus": [],
        },
        {
            "MenuName": "自助服务",
            "MenuUrl": "selfService",
            "Menus": [],
        },
        {
            "MenuName": "鑫知识库",
            "MenuUrl": "knowledge",
            "Menus": [],
        },
        {
            "MenuName": "经理中心",
            "MenuUrl": "amaldar",
            "Menus": [],
        },
        {
            "MenuName": "HR中心",
            "MenuUrl": "hr",
            "Menus": [],
        },
        {
            "MenuName": "样本",
            // "MenuUrl": "Dome",
            "Menus": [
                {
                    "MenuName": "Test",
                    "MenuUrl": "demo/test",
                    "Menus": []
                },
                {
                    "MenuName": "upload",
                    "MenuUrl": "demo/upload",
                    "Menus": []
                },
                {
                    "MenuName": "Editor",
                    "MenuUrl": "demo/Editor",
                    "Menus": []
                },
                {
                    "MenuName": "图表",
                    "MenuUrl": "demo/chart",
                    "Menus": []
                },
                {
                    "MenuName": "弹框",
                    "MenuUrl": "demo/dialog",
                    "Menus": []
                },
                {
                    "MenuName": "数据Table",
                    "MenuUrl": "demo/table",
                    "Menus": []
                },
                {
                    "MenuName": "表单",
                    "MenuUrl": "demo/form",
                    "Menus": []
                },
                {
                    "MenuName": "Tree树",
                    "MenuUrl": "demo/tree",
                    "Menus": []
                },
                {
                    "MenuName": "Tree树测试",
                    "Menus": [
                        {
                            "MenuName": "Tree",
                            "Menus": [
                                {
                                    "MenuName": "Tree",
                                    "MenuUrl": "demo/tree",
                                    "Menus": []
                                },
                            ]
                        },
                    ]
                }
            ]
        }]
}
