
/**
 * 转换html
 */
let $sce: ng.ISCEService = null;
// 去除最后一行的 br标签
let filterBr = (input: string) => {
    let index = input.lastIndexOf('<p></p>');
    let sub = 7;
    if (index == -1) {
        index = input.lastIndexOf('<p><br></p>');
        sub = 11;
    }
    if (index == -1) {
        index = input.lastIndexOf('<div><br></div>');
        sub = 15;
    }
    let last = input.length - sub;
    if (index == -1 || index != last) {
        return input;
    }
    if (index == last) {
        input = input.substr(0, input.length - sub);
        return filterBr(input);
    }
}
export default class Filter {
    static $instance = ["$sce", ($sce) => {
        return new Filter($sce).filter;
    }];
    constructor(
        private sce: ng.ISCEService
    ) {
        $sce = this.sce;
    }
    filter(input: string, obj: string) {
        if (input) {
            // 去除最后一行的 br标签
            return $sce.trustAsHtml(filterBr(input));
        } else {
            if (input == null) {
                return "Now";
            }
            return input;
        }
    }

}
