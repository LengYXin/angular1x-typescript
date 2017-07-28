import * as Allocation from '../../Allocation';
/**
 * 七牛  每次 调用Qiniu 方法都会创建一个新的 qiniu 对象
 */
export default class {
    static $inject = ['$q'];
    constructor(
        private $q: ng.IQService,
        // private serBusiness: serBusiness,
    ) { }

   /**
    * 上传 base64 编码到七牛云
    * @param base64 
    * @param uptoken 七牛 uptoken
    */
    qiniuBase64(base64, uptoken): ng.IPromise<any> {
        return <any>this.$q((resolve, reject) => {
            var url = `http://up-z1.qiniu.com/putb64/-1`;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    //这里可以判断图片上传成功,而且可以通过responseText获取图片链接
                    var data = JSON.parse(xhr.responseText);
                    resolve(data);
                    //图片链接就是yourcdnpath.xx/data.key
                    // document.getElementById("myDiv").innerHTML = xhr.responseText;
                } 
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Authorization", "UpToken " + uptoken);
            xhr.send(base64.replace("data:image/png;base64,", ""));
        });
    }
    /**
    *  调用会创建一个新的 qiniu 对象
    */
    Create() {
        return new qiniu();
    }
}
/**
 * qiniu
 */
class qiniu {
    config = {
        runtimes: 'html5,flash,html4',   //上传模式,依次退化
        browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
        uptoken_url: Allocation.qiniuConfig.uptoken_url,
        //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        // uptoken : '<Your upload token>',
        //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        // unique_names: true,
        // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
        // save_key: true,
        // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
        domain: Allocation.qiniuConfig.domain,
        //bucket 域名，下载资源时用到，**必需**
        // container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '1000mb',         //最大文件体积限制
        // flash_swf_url: '../js/plupload/Moxie.swf',  //引入flash,相对路径
        filters: {
            // mime_types: [
            //     //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
            //     { title: "图片文件", extensions: "jpg,gif,png,bmp" }
            // ]
        },
        get_new_uptoken: false,
        unique_names: true,
        // log_level: 5,
        max_retries: 3,                   //上传失败最大重试次数
        // dragdrop: true,                   //开启可拖曳上传
        // drop_element: 'editor-container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': this.FilesAdded,
            'BeforeUpload': this.BeforeUpload,
            'UploadProgress': this.UploadProgress,
            'FileUploaded': this.FileUploaded,
            'Error': this.Error,
            'UploadComplete': this.UploadComplete
            // Key 函数如果有需要自行配置，无特殊需要请注释
            //,
            // 'Key': function(up, file) {
            //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
            //     // 该配置必须要在 unique_names: false , save_key: false 时才生效
            //     var key = "";
            //     // do something with key here
            //     return key
            // }
        }
    }
    Qiniu: any
    /**上传 */
    Start() {
        this.Qiniu.start();
    }
    /**初始化七牛 */
    UploadInit() {
        console.log("----------config", this.config);
        return this.Qiniu = Qiniu.uploader(this.config);
    }
    FilesAdded(up, files) {
        console.log("FilesAdded  当您看到这条信息表明没有配置回调");
    }
    BeforeUpload(up, file) {
        console.log("BeforeUpload  当您看到这条信息表明没有配置回调");

    }
    UploadProgress(up, file) {
        console.log("UploadProgress  当您看到这条信息表明没有配置回调");

    }
    FileUploaded(up, file, info) {
        console.log("FileUploaded  当您看到这条信息表明没有配置回调");

    }
    Error(up, err, errTip) {
        console.log("Error  当您看到这条信息表明没有配置回调", up, err, errTip);

    }
    UploadComplete() {
        console.log("UploadComplete");
    }
}