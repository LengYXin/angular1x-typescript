/**
 * 自定义模板加载器指令
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {
    }
    restrict = 'E';
    transclude = true;
    replace = true;
    controller = [function () { }];
    template = '<div class="samTemplateLoader" ng-transclude></div>';
}
