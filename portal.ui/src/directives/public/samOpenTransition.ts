
/**
 * 打开过渡动画
 */

export default class directive implements ng.IDirective {
    static $instance = ['$timeout', '$rootScope', ($timeout, $rootScope): ng.IDirective => {
        return new directive($timeout, $rootScope);
    }];
    constructor(
        private $timeout: ng.ITimeoutService,
        private $rootScope: ng.IRootScopeService,
    ) {
    }
    restrict = 'A';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
        element.addClass('full-invisible');
        // console.log("动画", attrs);
        var delay = 1000;
        if (this.$rootScope.$pageFinishedLoading) {
            delay = 100;
        }
        // 如果标签属性中设置了 animation 属性就以该属性为动画，没有就拿默认的
        this.$timeout(function () {
            element.removeClass('full-invisible');
            let animation = attrs.animation || "fadeIn";
            element.addClass('animated ' + animation);
            if (attrs.removeanimation != undefined) {
                element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', x => {
                    element.removeClass('animated ' + animation);
                });
            }

        }, delay);
    };
}
