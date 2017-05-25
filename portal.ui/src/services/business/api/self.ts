import { serHelper } from '../../../service';
import * as GlobalConfig from '../../../config';
/**
 * 自助
 */
export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }
    /**
     * 社保公积金接口         "type:文章类型为social "
     * @param params 
     */
    private _findSocial = [];
    public findSocial(type: string) {
        let IPromises = this._findSocial.filter(x => { return x.type == type; });
        let IPromise: ng.IPromise<any>;
        if (IPromises.length) {
            IPromise = IPromises[0].IPromise;
        } else {
            IPromise = this.serHelper.serHTTP.getIPromise("/self/findSocial")
            this._findSocial.push({ type, IPromise });
        }
        let _d = {};
        IPromise.then(x => {
            // 社保公积金 数据分组
            if (type === "social") {
                let d = {};
                for (var i = 0; i < x.length; i++) {
                    let social = x[i];
                    if (d[social.tag] == null || d[social.tag].length <= 0) {
                        d[social.tag] = [];
                        d[social.tag].push(social);
                    }
                    else {
                        d[social.tag].push(social);
                    }
                }
                console.log(d);
                angular.extend(_d, d);
            } else {
                angular.extend(_d, angular.fromJson(x));
            }
        });
        return _d;
    }

    /**
     * 某社保公积金详情
     */
    private _findById = [];
    public get findById() {
        // let _d = {};
        // this.serHelper.serHTTP.get("/self/findById", { params: { id: this.serHelper.$stateParams.id } }).success(x => {
        //     angular.extend(_d, x);
        // });
        let id = this.serHelper.$stateParams.id;
        // let IPromises = this._findById.filter(x => { return x.id == id; });
        // let IPromise: ng.IPromise<any>;
        // if (IPromises.length) {
        //     IPromise = IPromises[0].IPromise;
        // } else {
        let IPromise = this.serHelper.serHTTP.getIPromise("/self/findById", { params: { id } });
        //     this._findById.push({ id, IPromise });
        // }
        let _d = {};
        IPromise.then(x => {
            angular.extend(_d, x);
        });
        return _d;
    }



    /**获取福利免息购车 */
    private _findWelfarecar: ng.IPromise<any>;
    public get findWelfarecar() {
        if (this._findWelfarecar) {
        } else {
            this._findWelfarecar = this.serHelper.serHTTP.getIPromise("/self/findWelfarecar");
        }
        return this._findWelfarecar;
    }
}