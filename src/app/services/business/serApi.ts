
import serHelper from '../serHelper';

import basekv from './api/basekv';

export default class {
    // static $inject = ['serHelper'];
    constructor(
        private serHelper: serHelper,
    ) {
        // if (GlobalConfig.pathname == "/index.html" || GlobalConfig.pathname == "/") {
        //     console.warn("程序加载时获取一批缓存的数据");
        //     // 程序加载时获取一批缓存的数据
        //     this.basekv.findSelfMenu();
        //     this.basekv.findCarouselByKey("selfhelper.homecarousel", 1692, 300)
        //     this.basekv.findCarouselByKey("selfhelper.pushcarousel", 1692, 300)
        //     this.basekv.findCarouselByKey("selfhelper.tagcarousel", 400, 120)
        // }
    }
    /**用户 */
    // user = new user(this.serHelper);
    /**快捷通道 友情链接 */
    basekv = new basekv(this.serHelper);
    // /**反馈 */
    // feedback = new feedback(this.serHelper);
    // /**消息 */
    // message = new message(this.serHelper);
    // /**咨询接口 */
    // consultation = new consultation(this.serHelper);
    // /**知识 */
    // knowledge = new knowledge(this.serHelper);
    // /**申请 */
    // apply = new apply(this.serHelper);
    // /**文化 */
    // culture = new culture(this.serHelper);
    // /**资讯公告 */
    // notice = new notice(this.serHelper);
    // /**系统 */
    // sys = new sys(this.serHelper);
    // /**精彩活动文章 */
    // activity = new activity(this.serHelper);
    // /**自助 */
    // self = new self(this.serHelper);
    // /**内推 */
    // push = new push(this.serHelper);
}