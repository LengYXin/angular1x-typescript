import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }
    /**
    *  反馈接口
    * @param content 反馈的内容
    */
    add(content): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("feedback/add", { content: content });

    }
}