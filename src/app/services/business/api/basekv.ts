import { serHelper } from '../../../service';
import * as Allocation from '../../../Allocation';
import * as angular from 'angular';

export default class {
    constructor(
        private serHelper: serHelper,
    ) {

    }

    private _quickway = [];
    /**
   * 快捷通道
   */
    public get quickway(): any[] {
        if (this._quickway.length < 1) {
            this.serHelper.serHTTP.getIPromise("basekv/findByKey?key=home.quickway").then(x => {
                angular.extend(this._quickway, angular.fromJson(x));
            });
        }
        return this._quickway;
    }

    private _friendlink = [];
    /**
    * 友情链接
    */
    public get friendlink(): any[] {
        if (this._friendlink.length < 1) {
            this.serHelper.serHTTP.getIPromise("basekv/findByKey?key=home.friendlink").then(x => {
                angular.extend(this._friendlink, angular.fromJson(x));
            });
        }
        return this._friendlink;
    }
    /**
    * 自助服务首页列表接口json格式
    */
    private _homemenu = [];
    public findSelfMenu() {
        if (this._homemenu.length < 1) {
            this.serHelper.serHTTP.getIPromise("basekv/findByKey", { params: { key: "selfhelper.homemenu" } }).then(x => {
                angular.extend(this._homemenu, angular.fromJson(x));
            });
        }
        return this._homemenu;
    }

    /**
    * 二维码
    */
    private _qrcode = [];
    public findQRCode() {
        if (this._qrcode.length < 1) {
            this.serHelper.serHTTP.getIPromise("basekv/findByKey", { params: { key: "sys.QRCode" } }).then(x => {
                angular.extend(this._qrcode, angular.fromJson(x));
            });
        }
        return this._qrcode;
    }

    /**
    * 自助服务首页轮播图接口json格式
    */
    private _carousel = [];
    public findCarouselByKey(_key, _width, _height) {

        // this.serHelper.serHTTP.get("basekv/findByKey", { params: { key: _key } }).success(x => {
        //     var result = this.StringToJson(x);
        //     if (result != null) {
        //         this.bubbleSort(result);
        //         let item = [];
        //         for (var i = 0; i < result.length; i++) {
        //             item.push("<img src='" + result[i].imgurl + "?" + Math.random() + "' alt='' />");
        //         }
        //     }
        // });
        // return ;

        let IPromises = this._carousel.filter(x => { return x._key == _key; });
        let item: any[] = [];
        if (IPromises.length) {
            item = IPromises[0].item;
        } else {
            this.serHelper.serHTTP.getIPromise("basekv/findByKey", { params: { key: _key } }).then(x => {
                var result = this.StringToJson(x);
                if (result != null) {
                    this.bubbleSort(result);
                    for (var i = 0; i < result.length; i++) {
                        // let url = result[i].imgurl + "?imageView2/1/w/" + _width + "/h/" + _height + "/q/80/format/png'";
                        let url = result[i].imgurl + '?imageslim';
                        item.push("<img src='" + url + "'  />");
                        let img = new Image();
                        img.src = url;
                        img.onload = function () {
                            // console.log(this);
                        };
                    }

                    this._carousel.push({ _key, item });
                }
            });
        }
        return item;

    }


    bubbleSort(array) {
        /*给每个未确定的位置做循环*/
        for (var unfix = array.length - 1; unfix > 0; unfix--) {
            /*给进度做个记录，比到未确定位置*/
            for (var i = 0; i < unfix; i++) {
                if (array[i].sortid > array[i + 1].sortid) {
                    var temp = array[i];
                    array.splice(i, 1, array[i + 1]);
                    array.splice(i + 1, 1, temp);
                }
            }
        }
        return array;
    }

    StringToJson(str) {
        try {
            return angular.fromJson(str);
        } catch (e) {
            return null;
        }
    }
}