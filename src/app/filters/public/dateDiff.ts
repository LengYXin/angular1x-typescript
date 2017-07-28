
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
    filter(startime, endtime, formate) {
        //console.log("startime", startime);
        try {
            if (startime == null) {
                return "";
            }
            var date1 = new Date(startime);
            var date2 = new Date();
            if (endtime != null && $.trim(endtime).length > 0) {
                date2 = new Date(endtime);
            }

            var s1 = date1.getTime(), s2 = date2.getTime();
            var total = (s2 - s1) / 1000;

            var day = Math.floor(total / (24 * 60 * 60));//计算整数天数

            var afterDay = total - day * 24 * 60 * 60;//取得算出天数后剩余的秒数
            var hour = Math.floor(afterDay / (60 * 60));//计算整数小时数
            var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;//取得算出小时数后剩余的秒数
            var min = Math.floor(afterHour / 60);//计算整数分
            var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;//取得算出分后剩余的秒数

            if (formate == "yearAndmonth" || formate == null || formate == "") {
                let year: any = date2.getFullYear() - date1.getFullYear();
                let month = date2.getMonth() - date1.getMonth();
                if (month < 0 || (month == 0 && date2.getDate() < date1.getDate())) {
                    year = year - 1;
                }
                if (year < 0) {
                    year = 0;
                }
                if (date2.getDate() < date1.getDate()) {
                    month--;
                }
                if (month < 0) {
                    month += 12;
                }
                if (year == null || isNaN(year))
                    return "";
                return (year <= 0 ? "" : (year + " 年 ")) + month + " 个月";
            }
            if (formate == "year") {
                let year: any = date2.getFullYear() - date1.getFullYear();
                if (date2.getMonth() < date1.getMonth() || (date2.getMonth() == date1.getMonth() && date2.getDate() < date1.getDate())) {
                    year = year - 1;
                }
                if (year < 0) {
                    year = 0;
                }
                let month = Math.floor(((date2.getMonth() + 12 - date1.getMonth()) % 12) / 12 * 10) / 10;
                //let diffDay = date2.getDate() - date1.getDate();
                year = year + month;
                if (year == null || isNaN(year))
                    return "";
                return year + " 年";
            }
            if (formate == "month") {
                let year: any = date2.getFullYear() - date1.getFullYear();
                if (date2.getMonth() < date1.getMonth() || (date2.getMonth() == date1.getMonth() && date2.getDate() < date1.getDate())) {
                    year = year - 1;
                }
                if (year < 0) {
                    year = 0;
                }
                let month = (date2.getMonth() + 12 - date1.getMonth()) % 12;

                month = year * 12 + month;
                if (month == null || isNaN(month))
                    return "";
                return month + " 月";
            }
            if (formate == "day") {
                return day + " 天 ";
            }
            return "";
            //return filter("date")(s2-s1, formate || "yy 年 MM 月 dd 天");
        }
        catch (e) {
            return "";
        }
    }
}
