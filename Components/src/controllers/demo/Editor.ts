import { serHelper, serBusiness } from '../../service';

/**
 * 富文本
 */
// export let controllersName: string = "DomeDialog";
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
    Editor: string = "";
    console() {
        console.log(this.Editor);
    }
}
