
/**
 * 日历   http://xdsoft.net/jqplugins/datetimepicker/
 */

export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() {
        $["datetimepicker"].setLocale('ch');
    }
    scope = {
        datetimepicker: "="
    };
    restrict = 'AE';
    require = "ngModel";
    replace = true;
    template = `<input type="text">`;
    link(scope: any, element: ng.IRootElementService, attrs: any, ctrl: any) {
        //清除节点
        scope.$on("$destroy", function () {
            let datetime = $("body>div.xdsoft_datetimepicker");
            datetime.each(function () {
                this.remove();
            });
        })
        let datetimepicker = scope.datetimepicker || {};
        datetimepicker.format = datetimepicker.datepicker == null || datetimepicker.datepicker ? datetimepicker.timepicker == null || datetimepicker.timepicker ? "Y-m-d h:i" : "Y-m-d" : "H:i";
        datetimepicker.onClose = function () {
            element.change();
        }
        // datetimepicker.onGenerate = (ct) => {
        //     console.log(ct);
        // };
        var unregister = scope.$watch(function () {
            // $(element).append("<input  style='border:none;width:100%;height:100%' " +
            //     "value='" + ctrl.$modelValue + "'>");
            // element.append(`<input type="text"  placeholder="选择日期" value='${ctrl.$modelValue}'>`);

            element.on('change', function () {
                scope.$apply(function () {
                    ctrl.$setViewValue(element.val());
                });
            });
            element["datetimepicker"](datetimepicker);
            // element.on('click', function () {
            //     element.find("input")["datetimepicker"]({
            //         format: attrs.format || 'Y/m/d h:i',
            //         onClose: function () {
            //             element.change();
            //         }
            //     });
            // });
            // element.click();
            return ctrl.$modelValue;
        }, function (value) {
            console.log(value);
            ctrl.$setViewValue(value);
            unregister();
        });

    };
}
class Controller {
    constructor() {

    }
}
