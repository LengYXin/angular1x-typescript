/// <reference path="angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="angularjs/angular.d.ts" />
/// <reference path="ionic/ionic.d.ts" />
/// <reference path="node/node.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="Interface.d.ts" />


//第3个概念：jquery的扩充属性及属性下附着的方法的写法

interface signalr {
    client: { enterRoom: any, sendMessage: any, offRoom: any };
    server: { addRoom: any, sendMsg: any }
}
interface connection {
    groupHub: signalr;
    hub: { start: Function };
}
//第1个概念：jquery方法的编写。 
interface JQueryStatic {
    connection: connection
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module plupload {
    class Uploader {
        constructor(s: any);
        start(): void;
        init(): void;
        bind(s: string, f: any): void;
    }
}


declare class wangEditor {
    constructor(s: string);
    config: any;
    create(): void;
    onchange: any;
    $txt: any;
}

declare var Qiniu: QiniuUploader;
interface QiniuUploader {
    uploader(cfg: any): any;
}


