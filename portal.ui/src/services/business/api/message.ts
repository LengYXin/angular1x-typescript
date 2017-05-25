import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }
    private _UnReadCount = {
        count: 0
    };
    /**
     * 获取消息数
     */
    public get getUnReadCount(): { count: number } {

        this.serHelper.serHTTP.get("message/getUnReadCount").success(x => {
            this._UnReadCount.count = x;
        });
        return this._UnReadCount;
    }

    /**
     * 消息列表
     * @param params "isRead:是否已读（0:未读,1:已读） pageIndex:页码 pageSize:每页显示数量"
     */
    public findAll(params): ng.IPromise<any> {
        return this.serHelper.serHTTP.getIPromise("message/findAll", { params: params });
    }
    // /message/markToRead
    /**
     * 设置消息为已读
     * @param id 
     */
    public markToRead(id) {
        return this.serHelper.serHTTP.postIPromise("message/markToRead", { id }).then(x => {
            this._UnReadCount.count--;
            if (this._UnReadCount.count < 0) {
                this._UnReadCount.count = 0;
            }
        });
    }

}