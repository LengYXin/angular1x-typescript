/**
 * 全局公共配置
 */

//开启调试模式  true  运行项目 观察控制台 请求等信息
export let debug: boolean = false;
//默认图片
export let defaultImg: { img: string; avatar: string } = {
    img: "/assets/img/yixin_logo.jpg",
    avatar: "/assets/img/user-edit.png",
};
//api  根路径
export let apiMainUrl: string = "/api/";
//本地文件上传路径
export let uploaderUrl: string = "/api/demo/upload";
export enum EnumServicesType { service = 1, factory = 2, provider = 4 };
export let qiniuConfig = {
    uptoken_url: '/api/sys/uptoken',//七牛云 uptoken
    domain: 'http://onx9b4g2x.bkt.clouddn.com',//七牛云地址
    images: '/images/'//图片路径
};
// 打包修改配置参数
export let buildFN = function () {
    debug = false;
    apiMainUrl = "/api/";
}
export let wf_base_url: string = 'http://api.scf.sundot.cn';
// 当前文档 name 路径
export let pathname = window.location.pathname;
pathname = pathname.substr(pathname.lastIndexOf('/'), pathname.length);
// 正则 
export let RegExps = {
    //过滤 评论 输入
    commentAdd: [/<p><\/p>/g, /<p><br><\/p>/g, /<div><br><\/div>/g, /<script>[\w\s\W]*?<\/script>/g],
    //手机号
    phone: /^1[34578]\d{9}$/
}