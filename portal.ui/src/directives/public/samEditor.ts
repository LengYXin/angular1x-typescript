
/**
 * 编辑器 http://www.wangeditor.com/index.html
 */
import { serHelper, serBusiness } from '../../service';


export default class directive implements ng.IDirective {
    static $instance = ["serHelper", (serHelper): ng.IDirective => {
        return new directive(serHelper);
    }];
    constructor(
        private serHelper: serHelper
    ) {
        // window["UEDITOR_CONFIG"]["UEDITOR_HOME_URL"] = "demo/upload";
        // this.Qiniu.config.filters = {
        //     mime_types: [
        //         //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
        //         { title: "图片文件", extensions: "jpg,gif,png,bmp" }
        //     ]
        // };
        // this.Qiniu.config.auto_start = true;
        // this.Qiniu.config.max_file_size = "100mb";
        // this.Qiniu.config["dragdrop"] = true;                   //开启可拖曳上传
        // this.Qiniu.config["drop_element"] = 'editor-container';  //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
    }
    // Qiniu = this.serHelper.serQiniu.Create();
    scope = {};
    restrict = 'AE';
    require = "ngModel";
    replace = true;
    template = `
    <div>
     <div data-wangEditor style="height:400px"></div>
    </div>
    `;
    link(scope: any, element: ng.IRootElementService, attrs: any, ctrl: any) {

        // 创建编辑器
        window["wangEditor"].numberOfLocation = 0;
        window["wangEditor"].config.printLog = false;
        var editor = new window["wangEditor"](element.find("div[data-wangEditor]")[0]);
        editor.config.printLog = false;
        editor.config.menuFixed = false;
        editor.config.customUpload = true;  // 设置自定义上传的开关
        editor.config.customUploadInit = () => {
            // 触发选择文件的按钮的id
            // this.Qiniu.config.browse_button = editor.customUploadBtnId;
            // // 触发选择文件的按钮的父容器的id
            // this.Qiniu.config["container"] = editor.customUploadContainerId;
            // this.Qiniu.config.init.UploadProgress = (up, file) => {
            //     // 显示进度条
            //     editor.showUploadProgress(file.percent);
            // };
            // this.Qiniu.config.init.UploadComplete = () => {
            //     editor.hideUploadProgress();
            // };
            // this.Qiniu.config.init.FileUploaded = (up, file, info) => {
            //     var sourceLink = `http://olt0mifi5.bkt.clouddn.com/${file.target_name}?imageView2/2/w/100/q/100/format/png`;
            //     // 插入图片到editor
            //     editor.command(null, 'insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
            // };
            // var uploader = this.Qiniu.UploadInit();
        };  // 配置自定义上传初始化事件，uploadInit方法在上面定义了  
        editor.config.emotions = {
            'default': {
                title: '默认',
                data: '../assets/emotions.data'
            },
        };
        editor.onchange = function () {
            // 从 onchange 函数中更新数据
            scope.$apply(function () {
                var html = editor.$txt.html();
                ctrl.$setViewValue(html);
            });
        };
        editor.create();
        /**
         * 控件生成后里面的a标签默认带有href='#' 这会影响 ng路由，所以需要对这些标签进行处理
         */
        // console.log("--------------",editor.$editorContainer.find("a[href='#']"));
        editor.$editorContainer.find("a[href='#']").each(function (i, e) {
            $(e).attr("href", "javascript:void(0);");
        })
        //清除节点
        scope.$on("$destroy", function () {
            editor.destroy();
        })

        // 初始化七牛上传
        // function uploadInit() {
        //     // this 即 editor 对象
        //     var editor = this;
        //     console.log("editor", editor);
        //     // 触发选择文件的按钮的id
        //     var btnId = editor.customUploadBtnId;
        //     // 触发选择文件的按钮的父容器的id
        //     var containerId = editor.customUploadContainerId;

        //     // 创建上传对象
        // var uploader = Qiniu.uploader({
        //     runtimes: 'html5,flash,html4',    //上传模式,依次退化
        //     browse_button: btnId,       //上传选择的点选按钮，**必需**
        //     uptoken_url: '/qiniu/UpToken',
        //     //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        //     // uptoken : '<Your upload token>',
        //     //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        //     // unique_names: true,
        //     // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
        //     // save_key: true,
        //     // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
        //     domain: 'http://olt0mifi5.bkt.clouddn.com',
        //     //bucket 域名，下载资源时用到，**必需**
        //     // container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
        //     max_file_size: '100mb',           //最大文件体积限制
        //     // flash_swf_url: '../js/plupload/Moxie.swf',  //引入flash,相对路径
        //     filters: {
        //         mime_types: [
        //             //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
        //             { title: "图片文件", extensions: "jpg,gif,png,bmp" }
        //         ]
        //     },
        //     get_new_uptoken: false,
        //     unique_names: true,
        //     // log_level: 5,
        //     max_retries: 3,                   //上传失败最大重试次数
        //     dragdrop: true,                   //开启可拖曳上传
        //     drop_element: 'editor-container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        //     chunk_size: '4mb',                //分块上传时，每片的体积
        //     auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        //     init: {
        //         'FilesAdded': function (up, files) {
        //             console.log('on FilesAdded', up, files);
        //             // plupload.each(files, function (file) {
        //             //     // 文件添加进队列后,处理相关的事情
        //             //     console.log('on FilesAdded');
        //             // });
        //         },
        //         'BeforeUpload': function (up, file) {
        //             // 每个文件上传前,处理相关的事情
        //             console.log('on BeforeUpload');
        //         },
        //         'UploadProgress': function (up, file) {
        //             // 显示进度条
        //             editor.showUploadProgress(file.percent);
        //         },
        //         'FileUploaded': function (up, file, info) {
        //             // 每个文件上传成功后,处理相关的事情
        //             // 其中 info 是文件上传成功后，服务端返回的json，形式如
        //             // {
        //             //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
        //             //    "key": "gogopher.jpg"
        //             //  }
        //             console.info('qiniu FileUploaded', file, info);
        //             // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

        //             // var domain = up.getOption('domain');
        //             // var res = $.parseJSON(info);
        //             // var sourceLink = domain + res.key; //获取上传成功后的文件的Url
        //             var sourceLink = `http://olt0mifi5.bkt.clouddn.com/${file.target_name}?imageView2/2/w/100/q/100/format/png`;
        //             console.log(sourceLink);

        //             // 插入图片到editor
        //             editor.command(null, 'insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
        //         },
        //         'Error': function (up, err, errTip) {
        //             //上传出错时,处理相关的事情
        //             console.log('on Error');
        //         },
        //         'UploadComplete': function () {
        //             //队列文件处理完毕后,处理相关的事情
        //             console.log('on UploadComplete');

        //             // 隐藏进度条
        //             editor.hideUploadProgress();
        //         }
        //         // Key 函数如果有需要自行配置，无特殊需要请注释
        //         //,
        //         // 'Key': function(up, file) {
        //         //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
        //         //     // 该配置必须要在 unique_names: false , save_key: false 时才生效
        //         //     var key = "";
        //         //     // do something with key here
        //         //     return key
        //         // }
        //     }
        //     });
        // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
        // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
        // }
    };

}
class Controller {
    constructor() {

    }
}
