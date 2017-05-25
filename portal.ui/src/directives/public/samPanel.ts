
/**
 * 面板
 */

export default class directive implements ng.IDirective {
    static $instance = [(): ng.IDirective => {
        return new directive();
    }];
    constructor(
    ) {
    }
    restrict = 'AE';
    replace = true;
    transclude = true;// {
    //     "panelTitle": "?samPanelTitle",
    //     "panelBody": "?samPanelBody",
    // };
    //  <div class="panel-heading " ng-transclude='panelTitle' ></div>
    //  <div class="panel-body"   ng-transclude='panelBody' ></div>
    template = (e, a) => {
        // console.log("----------", e, a);
        return `
            <div class="panel  full-invisible" sam-Open-Transition>
            <ng-transclude></ng-transclude>
            </div>
            `
    };
    link(scope: any, element: ng.IRootElementService, attrs: any, ctrl: any, transclude: ng.ITranscludeFunction) {
        // console.log("object", scope, attrs);
        // transclude((x, y) => {
        //     console.log("-------------------------------",x, y);
        // });
    }
}
