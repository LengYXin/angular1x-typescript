import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }
    /**
     *  咨询接口
     * @param content 咨询的内容
     */
    add(content): ng.IPromise<any> {
        return this.serHelper.serHTTP.postIPromise("consultation/add", { consultation: content });
    }
}