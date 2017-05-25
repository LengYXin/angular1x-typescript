/**
 * 监听ng-repeat渲染完成
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {
    }
    link(scope: any, element: ng.IRootElementService, attrs: any) {
        // console.log("object");
        if (scope.$last == true) {
            scope.$eval(attrs.samRepeatlast)
        }
    }
}
