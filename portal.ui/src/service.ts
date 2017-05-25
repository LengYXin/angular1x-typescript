/**
 * 导出 共有服务给 外部ts 提示使用
 */
/** 帮助服务 */
import serHelper from './services/helper/serHelper';
/** 业务服务 */
import serBusiness from './services/business/serBusiness';
/** 权限父类 */
import Permissions from './baseClass/Permissions';
/** 文章评论父类 */
import articleReview from './baseClass/articleReview';
export { serHelper, serBusiness, Permissions, articleReview };
