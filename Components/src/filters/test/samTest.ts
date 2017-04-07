
/**
 * 测试过滤器
 */

export default class Filter {
    static $instance = ["$filter", ($filter) => {
        return new Filter($filter).filter;
    }];
    static $inject = ['$filter'];
    constructor(
        private $filter: ng.IFilterFilter
    ) {
        // console.log(this.$filter);
    }
    filter(input, obj) {
        console.debug("执行了 过滤器", input);
        console.debug("执行了 过滤器参数", obj);
        return input + "--查看控制台输出";
    }
}

