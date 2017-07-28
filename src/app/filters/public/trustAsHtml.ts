import * as Allocation from '../../Allocation';
/**
 * 转换html
 */
let $sce: ng.ISCEService = null;
// 去除最后一行的 br标签
let filterBr = (input: string) => {
    Allocation.RegExps.commentAdd.map(x => {
        input = input.replace(x, "");
    });
    return input;
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
                return "";
            }
            return input;
        }
    }

}
