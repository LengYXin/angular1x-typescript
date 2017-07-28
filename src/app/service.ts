/**
 * 导出 共有服务给 外部ts 提示使用
 */
/** 帮助服务 */
import serHelper from './services/serHelper';
/** 业务服务 */
import serBusiness from './services/serBusiness';
// /** 权限父类 */
// import Permissions from './baseClass/Permissions';
// /** 经理 hr 中心 */
// import MgHr from './baseClass/mg&hr';
// /** 文章评论父类 */
// import articleReview from './baseClass/articleReview';
/** 装饰器 */
import * as DecoratorFactory from './DecoratorFactory';
/** 菜单 */
// import * as Menus from './baseClass/menus.json';

export {
    serHelper,
    serBusiness,
    // Permissions,
    // articleReview,
    DecoratorFactory,
    // Menus,
    // MgHr
};
