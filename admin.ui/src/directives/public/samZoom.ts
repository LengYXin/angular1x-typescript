/**
 * 变焦
 * https://github.com/kingdido999/zooming
 */
export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() { }
    restrict = 'A';
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
        console.log("img",element);
        var customZooming = new window["Zooming"]({
             defaultZoomable: element[0]
        })
        var config = customZooming.config();
        customZooming.config({
            transitionDuration: 0.8,
            bgColor: '#000',
            enableGrab: !config.enableGrab,
            scaleBase: config.scaleBase,
        });
    }
}
