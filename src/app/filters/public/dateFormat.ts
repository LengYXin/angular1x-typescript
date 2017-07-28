
/**
 * 统一时间格式
 */
let filter: ng.IFilterService = null;
export default class Filter {
    static $instance = ["$filter", ($filter) => {
        return new Filter($filter).filter;
    }];
    constructor(
        private $filter: ng.IFilterService
    ) {
        filter = this.$filter;
    }
    filter(input: string, obj: string) {
        if (input) {
            // console.debug("执行了 过滤器", filter("date")(input.match(/-?[1-9]\d*/)[0], obj));
            // console.debug("执行了 过滤器参数", obj);
            // return filter("date")(input.match(/-?[1-9]\d*/)[0], obj);
            return filter("date")(input, obj || "yyyy / MM / dd");
        } else {
            if (input == null) {
                return "";
            }
            return input;
        }

    }
}
