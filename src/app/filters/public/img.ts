import * as Allocation from '../../Allocation';

/**
 * 默认图片
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
        if (input && input.length > 0) {
            return input;
        } else {
            return Allocation.defaultImg[obj||'img'];
        }

    }
}
