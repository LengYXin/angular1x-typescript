
/**
 * 编辑器 http://www.wangeditor.com/index.html
 */
import { serHelper, serBusiness } from '../../service';
import * as emotions from '../json/emotions.json';
import * as Allocation from '../../Allocation';


export default class directive implements ng.IDirective {
    static $instance = ["serHelper", (serHelper): ng.IDirective => {

        return new directive(serHelper);
    }];
    constructor(
        private serHelper: serHelper
    ) {
        // window["UEDITOR_CONFIG"]["UEDITOR_HOME_URL"] = "demo/upload";
        this.Qiniu.config.filters = {
            mime_types: [
                //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                { title: "图片文件", extensions: "jpg,gif,png,bmp" }
            ]
        };
        this.Qiniu.config.auto_start = true;
        this.Qiniu.config.max_file_size = "100mb";
        this.Qiniu.config["dragdrop"] = true;                   //开启可拖曳上传
        this.Qiniu.config["drop_element"] = 'editor-container';  //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        // this.createMenu();
    }
    // 获取 wangEditor 对象
    wangEditor: any = window["wangEditor"];
    Qiniu = this.serHelper.serQiniu.Create();
    scope = false;
    restrict = 'AE';
    require = "?ngModel";
    replace = true;
    template = `
    <div>
     <div data-wangEditor style="height:400px"></div>
    </div>
    `;
    editor;
    element;
    link(scope: any, element: ng.IRootElementService, attrs: any, ctrl: any) {
        this.element = element;
        // 创建编辑器
        this.wangEditor.numberOfLocation = 0;
        this.wangEditor.config.printLog = false;
        setTimeout(() => {
            var editor;
            this.editor = editor = new this.wangEditor(element.find("div[data-wangEditor]")[0]);
            // 处理功能菜单
            if (editor.config.menus.indexOf("uploader") == -1) {
                editor.config.menus.splice(29, 0, "uploader");
            }
            if (attrs.menus && attrs.menus.length > 0) {
                let menus = [];
                attrs.menus.split(',').forEach(x => {
                    menus.push(x);
                });
                // menus.push("|");
                editor.config.menus = menus;
            }
            editor.config.printLog = false;
            editor.config.menuFixed = false;
            if (editor.config.menus.indexOf("img") != -1) {
                editor.config.customUpload = true;  // 设置自定义上传的开关
                editor.config.customUploadInit = () => {
                    // 触发选择文件的按钮的id
                    this.Qiniu.config.browse_button = editor.customUploadBtnId;
                    // 触发选择文件的按钮的父容器的id
                    this.Qiniu.config["container"] = editor.customUploadContainerId;
                    this.Qiniu.config.init.UploadProgress = (up, file) => {
                        // 显示进度条
                        editor.showUploadProgress(file.percent);
                    };
                    this.Qiniu.config.init.UploadComplete = () => {
                        editor.hideUploadProgress();
                    };
                    this.Qiniu.config.init.FileUploaded = (up, file, info) => {
                        var sourceLink = `${Allocation.qiniuConfig.images + file.target_name}`;
                        // 插入图片到editor
                        // editor.command(null, 'insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>');
                        // editor.$txt.html('<p>要初始化的内容</p>');
                        editor.$txt.append('<img src="' + sourceLink + '" style="max-width:100%;"/>');
                        editor.onchange();
                    };
                    var uploader = this.Qiniu.UploadInit();

                };  // 配置自定义上传初始化事件，uploadInit方法在上面定义了  
            }

            editor.config.emotions = {
                'default': {
                    title: '默认',
                    data: emotions
                },
                // 'xinlang': {
                //     title: '新浪',
                //     data: 'assets/json/emotions-xl.json'
                // },
            };
            // 源码已经改写 这个事件 选择表情 在 Edge浏览器中不执行 
            editor.onchange = function () {
                // console.log("editor.$txt.html", editor.$txt.html());
                // 从 onchange 函数中更新数据
                scope.$apply(function () {
                    var html = editor.$txt.html();
                    ctrl.$setViewValue(html);
                });
            };
            editor.create();
            // console.log("editor", editor, attrs);
            this.updateEditor();
            //清除节点
            scope.$on("$destroy", function () {
                editor.destroy();
            })
            // console.log("console", ctrl.$modelValue);
            if (ctrl.$modelValue && ctrl.$modelValue.length > 0) {
                // editor.command(null, 'insertHtml', ctrl.$modelValue);
                editor.$txt.html(ctrl.$modelValue);
            } else {
                var unregister = scope.$watch(function () {
                    return ctrl ? ctrl.$modelValue : undefined;
                }, function (value) {
                    // editor.$txt.append(value);
                    // console.log("unregister", value);
                    // editor.command(null, 'insertHtml', value);
                    editor.$txt.html(value);

                    unregister();
                });

            };
            // 清空
            scope.$watch(() => {
                return ctrl ? ctrl.$modelValue : undefined;
            }, (x, y) => {
                if (x != null && x.length < 1) {
                    editor.$txt.html('<p><br></p>');
                } else {
                }
            });
        });

    };
    updateEditor() {
        // 重新计算编辑器大小
        let wangEditor = this.editor.$editorContainer.find("div.wangEditor-menu-container");
        let height = wangEditor.height();
        this.editor.$txt.attr("style", "height:" + (this.element.height() - height - 9) + "px");
        //    笨方法 以防万一
        setTimeout(() => {
            if (height != wangEditor.height()) {
                height = wangEditor.height();
                this.editor.$txt.attr("style", "height:" + (this.element.height() - height - 9) + "px");
            }
        });
        $(window).on("resize", x => {
            // console.log("size", wangEditor.height());
            if (height != wangEditor.height()) {
                height = wangEditor.height();
                this.editor.$txt.attr("style", "height:" + (this.element.height() - height - 9) + "px");
            }
        });
        // console.log("编辑器", editor);
        /**
         * 控件生成后里面的a标签默认带有href='#' 这会影响 ng路由，所以需要对这些标签进行处理
         */
        // console.log("--------------",editor.$editorContainer.find("a[href='#']"));
        this.editor.$editorContainer.find("a[href='#']").each(function (i, e) {
            $(e).attr("href", "javascript:void(0);");
        })
    }

}
class Controller {
    constructor() {
        if (window["wangEditor"]) {
            this.createMenu();
        }
    }
    wangEditor: any = window["wangEditor"];
    uploader;
    editor: any = {};
    createMenu() {
        // 用 createMenu 方法创建菜单
        let E = this.wangEditor;
        // panel 内容

        //初始化上传控件 
        // let uploaderInit = ($container) => {
        //     this.uploaderInit(red_id, $container);
        // };
        let _this_ = this;
        E.createMenu(function (check) {
            let red_id = "uploader" + Math.ceil(Math.random() * 1000000);
            // console.log(this);
            // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
            var menuId = 'uploader';
            // debugger
            // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
            if (!check(menuId)) {
                return;
            }

            // this 指向 editor 对象自身
            var editor = _this_.editor = this;
            // 创建 menu 对象
            var menu = new E.Menu({
                editor: editor,  // 编辑器对象
                id: menuId,  // 菜单id
                title: '上传文件', // 菜单标题

                // 正常状态和选中状态下的dom对象，样式需要自定义
                $domNormal: $('<a href="#" tabindex="-1"><i class="fa fa-upload"></i></a>'),
                $domSelected: $('<a href="#" tabindex="-1"><i class="fa fa-upload"></i></a>')
            });
            // console.log("菜单按钮", menu);
            var $container = $(`
             <div>
                <button id="${red_id}" type="button" class="btn btn-block"><i class="wangeditor-menu-img-upload"></i></button>
             </div>
            `);

            // 添加panel
            menu.dropPanel = new E.DropPanel(editor, menu, {
                $content: $container,
                width: 350,
                onRender: function () {
                    // uploaderInit($container);
                    _this_.uploaderInit(red_id, $container, editor);
                }
            });
            // 增加到editor对象中
            editor.menus[menuId] = menu;
        });
    }
    // 初始化上传控件
    uploaderInit(red_id, $container: JQuery, editor) {
        // console.log("red_id", red_id);
        let tpl = `<a href="javascript:void(0)" class="list-group-item">[100%] </a>`;
        let progress = $(`
        <div class="progress">
        </div>
        `);
        let bar = $(`
        <div  class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;line-height: 20px;">
            0%
        </div>
        `);
        progress.append(bar);
        $($container).append(progress);
        let filesSize = 0;
        let filesLoaded = 0;
        this.uploader = new plupload.Uploader({
            browse_button: red_id,
            url: Allocation.uploaderUrl,
            // headers: { 'sso-token': this.$cookies.get('sso-token') },
            filters: {
                max_file_size: "2mb",
                mime_types: [
                    { title: "图片文件", extensions: "jpg,gif,png,bmp" },
                    { title: "文本文件", extensions: "txt,doc,docx,pdf" },
                    { title: "幻灯片文件", extensions: "ppt,pptx" },
                    { title: "表格文件", extensions: "xls,xlsx" }
                ],
                prevent_duplicates: true //不允许选取重复文件
            }
        });
        this.uploader.bind('FilesAdded', (up, files) => {
            // console.info('plupload FilesAdded', files);
            list_group = ` <div class="list-group editor-uploader-list">`;
            bar[0].style.width = "0%";
            bar.text("0%");
            $.each(files, (i, x) => {
                filesSize += x.size;
            });
            setTimeout(() => {
                this.uploader.start();
            }, 500);
        });
        let list_group = ` <div class="list-group editor-uploader-list">`;
        //单个文件上传成功
        this.uploader.bind("FileUploaded", (up, file, res) => {

            filesLoaded += file.loaded;
            res = JSON.parse(res.response);
            // console.log("FileUploaded", file);
            list_group += ` <a class="list-group-item editor-uploader-item"  target="_blank" href="${res.data.url}"><i class="fa fa-download"></i> <span>${file.name}</span> </a>`;

        });
        // 上传过程不断触发
        this.uploader.bind('UploadProgress', (up, file) => {
            // console.info('plupload UploadProgress', Math.ceil((filesLoaded + file.loaded) / filesSize * 100.0));
            let load = Math.ceil((filesLoaded + file.loaded) / filesSize * 100.0);
            bar[0].style.width = load - 1 + "%";
            bar.text(load - 1 + "%");
        });
        // 全部上传成功
        this.uploader.bind('UploadComplete', (up, files, r) => {
            // console.info('plupload UploadComplete', up);
            up.files = [];
            bar[0].style.width = "100%";
            bar.text("100%");
            list_group += " </div>";
            editor.$txt.append(list_group);
            editor.onchange();
        });
        this.uploader.init();
        function FilesAdded(files) {

        }
    }
}
// 扩展上传插件
new Controller();