
/**
 * HTTP服务
 */
import * as GlobalConfig from '../../config';
export default class {
    static $type = GlobalConfig.EnumServicesType.service;
    static $inject = ['$http', 'toastr', 'cfpLoadingBar', '$cookies', '$q'];
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
    // switch_host() {
    //     if (GlobalConfig.apiMainUrl == "http://localhost:8080/") {
    //         GlobalConfig.set_host("http://10.100.83.25:8080/");
    //         this.$cookies.put('debug_host', GlobalConfig.apiMainUrl);
    //     } else {
    //         GlobalConfig.set_host("http://localhost:8080/");
    //         this.$cookies.put('debug_host', GlobalConfig.apiMainUrl);
    //     }
    // }
    http_wrapper(url: string): string {
        // this.cfpLoadingBar.start();
        // GlobalConfig.debug ? console.debug("Get请求", url + JSON.stringify(config && config.params && config.params)) : undefined;
        let urlStr: string;
        if (url.indexOf("http://") === -1) {
            if (url.indexOf('/') == 0) {
                url = url.substr(1, url.length);
            }
            urlStr = GlobalConfig.apiMainUrl + url;
        } else {
            urlStr = url;
        }
        return urlStr;
    }
    // get 请求  弃用
    get<T>(url: string, config?: ng.IRequestShortcutConfig) {
        // GlobalConfig.debug ? console.debug("Get请求 ：" + url, config) : undefined;
        const urlStr = this.http_wrapper(url);
        if (!config) {
            config = {};
        }
        if (!config.params) {
            config.params = {};
        }
        config.params.resTime = new Date().getTime();
        return new HttpSuccess(this.$http.get<T>(urlStr, config), this.toastr, this.cfpLoadingBar);
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

    // post 请求 弃用
    post<T>(url: string, data: any, config?: ng.IRequestShortcutConfig) {
        // GlobalConfig.debug ? console.debug("Post请求 ：" + url, data) : undefined;
        let urlStr = this.http_wrapper(url);
        urlStr += "?resTime=" + new Date().getTime();
        return new HttpSuccess(this.$http.post<T>(urlStr, data, config), this.toastr, this.cfpLoadingBar);
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
    //处理成功请求 对状态吗 统一管理
    success(callback) {
        // console.debug("object",typeof callback);
        this.http.success((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
            this.cfpLoadingBar.complete();
            switch (status) {
                case 200:
                    this.implementCallback(data, config, callback);
                    break;
                default:
                    this.errorCallback();
                    if (GlobalConfig.debug) {
                        this.toastr.error(`
                    <br/>
                    <p>装填吗=${status}</p>
                    <p>请求地址=${config.url}</p>
                    <p>参数=${JSON.stringify(config.params || config.data)}</p>
                    `, '访问出错！！！', { timeOut: 3000 });
                    }
                    console.error("访问出错", status, config);
                    break;
            }

        });
        return this;
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
                if (GlobalConfig.debug) {
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
                if (GlobalConfig.debug) {
                    this.toastr.error(`
                 <p>请求地址=${config.url}</p>
                ${data.data}`, 'API Error', this.toastrOption);
                }
                errorCallback ? errorCallback(data.data) : undefined;
                break;
            default:
                // callback(data);
                this.errorCallback(data.data);
                errorCallback ? errorCallback(data.data) : undefined;
                if (GlobalConfig.debug) {
                    this.toastr.error(`
                 <p>请求地址=${config.url}</p>
                ${data.data}`, 'API Error', this.toastrOption);
                }
                console.error("API Error", data);
                break;
        }
    }
    error(callback) {
        this.errorCallback = callback;
        this.http.error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
            if (GlobalConfig.debug) {
                this.toastr.error(`
                    <br/>
                    <p>装填吗=${status}</p>
                    <p>请求地址=${config.url}</p>
                    <p>参数=${JSON.stringify(config.params)}</p>
                    `, '访问出错！！！', this.toastrOption);
            }
            this.cfpLoadingBar.complete();
            callback(data);
        });
        return this;
    }
}
/**
 * Http 请求返回 类型
 */
interface HTTPRequest {
    code: number;
    data: any;
}