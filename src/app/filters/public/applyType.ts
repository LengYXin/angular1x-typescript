
/**
 * 申请类型
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
            switch (input) {
                case "entry":
                    return "入职申请";
                case "leave":
                    return "离职申请";
                case "positive":
                    return "转正申请";
                case "income":
                    return "收入证明";
                case "bankid":
                    return "修改银行卡申请";
                case "passive":
                    return "被动离职申请";
                case "incumbency":
                    return "在职证明申请";
                case "residence":
                    return "办理居住证申请";
                case "welfarecar":
                    return "福利免息购车申请";
                case "socialfund":
                    return "社保公积金申请";
                case "seals":
                    return "公章申请";
                case "examination":
                    return "年度体检申请";
                default:
                    return "其它";
                    
            }
        } else {
            if (input == null) {
                return "";
            }
            return input;
        }

    }
}
