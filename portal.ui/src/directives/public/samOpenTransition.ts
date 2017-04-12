
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
        var delay = 1000;
        if (this.$rootScope.$pageFinishedLoading) {
            delay = 100;
        }

        this.$timeout(function () {
            element.removeClass('full-invisible');
            element.addClass('animated zoomIn');
        }, delay);
    };
}
