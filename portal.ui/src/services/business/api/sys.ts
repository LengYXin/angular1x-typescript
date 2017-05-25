import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }

    /**
   * qiniu token
   */
    private _data: any = {};
    public get uptoken(): any {
        if (!this._data.uptoken) {
            this.serHelper.$http.get(GlobalConfig.apiMainUrl + "sys/uptoken").then((x) => {
                angular.extend(this._data, x.data);
            });
        }
        return this._data;
    }
}