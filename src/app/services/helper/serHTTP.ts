
/**
 * HTTP服务
 */
import * as Allocation from '../../Allocation';
export default class {
    constructor(
        private $http: ng.IHttpService,
        private toastr: any,
        private cfpLoadingBar: any,//进度条
        private $cookies: any,
        private $q: ng.IQService,
    ) {
        // let host = $cookies.get("debug_host");
        // if (host == undefined) {
        //     $cookies.put('debug_host', GlobalConfig.apiMainUrl);
        // } else {
        //     GlobalConfig.set_host(host);
        // }

        // console.info($http.defaults.headers.common['Access-Control-Allow-Headers']);
        // $http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
        // $http.defaults.headers.common['sso-token'] = $cookies.get('sso-token');
    }
 
    http_wrapper(url: string): string {
        // this.cfpLoadingBar.start();
        // GlobalConfig.debug ? console.debug("Get请求", url + JSON.stringify(config && config.params && config.params)) : undefined;
        let urlStr: string;
        if (url.indexOf("http://") === -1) {
            if (url.indexOf('/') == 0) {
                url = url.substr(1, url.length);
            }
            urlStr = Allocation.apiMainUrl + url;
        } else {
            urlStr = url;
        }
        return urlStr;
    }
    //get 请求  最新版
    getIPromise<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IPromise<any> {
        const urlStr = this.http_wrapper(url);
        return <any>this.$q((sus, err) => {
            if (!config) {
                config = {};
            }
            if (!config.params) {
                config.params = {};
            }
            config.params.resTime = new Date().getTime();
            this.$http.get<T>(urlStr, config).then(x => {
                new HttpSuccess(null, this.toastr, this.cfpLoadingBar).implementCallback(x.data, x.config, sus, err);
            }).catch(x => {
                err(x);
            });
        });
    }
    // post 请求 最新版
    postIPromise<T>(url: string, data: any, config?: ng.IRequestShortcutConfig): ng.IPromise<any> {
        let urlStr = this.http_wrapper(url);
        urlStr += "?resTime=" + new Date().getTime();
        return <any>this.$q((sus, err) => {
            this.$http.post<T>(urlStr, data, config).then(x => {
                new HttpSuccess(null, this.toastr, this.cfpLoadingBar).implementCallback(x.data, x.config, sus, err);
            }).catch(x => {
                err(x);
            });
        });
    }
    //测试 使用
    getTest<T>(url: string, config?: ng.IRequestShortcutConfig): ng.IPromise<any> {
        // GlobalConfig.debug ? console.debug("Get请求", url + JSON.stringify(config && config.params && config.params)) : undefined;
        const urlStr = this.http_wrapper(url);
        return <any>this.$q((sus, err) => {
            this.$http.get<T>(urlStr, config).then(x => {
                sus(x);
            }).catch(x => {
                err(x);
            });
        });
    }
}
/**
 * HTTP请求 处理类
 * ng  接口  interface IHttpPromiseCallback<T> {
 *      (data: T, status: number, headers: IHttpHeadersGetter, config: IRequestConfig): void;
 *   }
 *  
 */
class HttpSuccess<T> {
    constructor(
        private http?: ng.IHttpPromise<T>,
        private toastr?: any,//弹框组件
        private cfpLoadingBar?: any,//进度条
    ) {

    }
    //错误回调
    errorCallback: Function = function (r) {

    }
    toastrOption = { timeOut: 3000, allowHtml: true };
    implementCallback(data, config: ng.IRequestConfig, callback, errorCallback?) {
        // console.log(data);
        switch (data.code) {
            case 0: // 状态吗为 0的情况下 为成功
            case 200:
                callback(data.data);
                break;
            case 1001:   //token过期或无效  没登陆
            case 100:
                if (Allocation.debug) {
                    this.toastr.error(`
                 <p>请求地址=${config.url}</p>
                ${data.data}`, 'API Error', this.toastrOption);
                }
                errorCallback ? errorCallback(data.data) : undefined;
                // window.location.href = "/login.html?jumpto=" + window.location.href;
                setTimeout(function () {
                    window.location.href = "login.html";
                }, 1000);
                break;
            case 101:
            case 102:
            case 103:
                if (Allocation.debug) {
                    this.toastr.error(`
                 <p>请求地址=${config.url}</p>
                ${data.data}`, 'API Error', this.toastrOption);
                }
                errorCallback ? errorCallback(data.data) : undefined;
                break;
            case 20000:
                this.toastr.error("账号不存在");
                break;
            default:
                // callback(data);
                this.errorCallback(data.data);
                errorCallback ? errorCallback(data.data) : undefined;
                if (Allocation.debug) {
                    this.toastr.error(`
                 <p>请求地址=${config.url}</p>
                ${data.data}`, 'API Error', this.toastrOption);
                }
                console.error("API Error", data);
                break;
        }
    }
}
/**
 * Http 请求返回 类型
 */
interface HTTPRequest {
    code: number;
    data: any;
}