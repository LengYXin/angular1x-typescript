/**
 * 全局配置模块
 */

//开启调试模式  true  运行项目 观察控制台 请求等信息
export let debug: boolean = true;
export let defaultImg: { img: string; avatar: string } = {
    img: "/uploads/knowledge/user-edit.png",
    avatar: "/assets/img/tx.png",
};//默认图片
export let apiMainUrl: string = "/api/";//api  根路径
export let uploaderUrl: string = "/api/demo/upload";//本地文件上传路径
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