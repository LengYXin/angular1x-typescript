import { serHelper } from '../../service';

// import 'plupload';

export default class {
    static $inject = ['$scope', 'serHelper', 'Upload', '$cookies'];
    //路由参数
    static $stateParams = [];
    uploader: any;
    qiniu_uploader: any;
    qiniu_files: any = [];
    file: any;
    files: any;
    imgFile: any = {};
    croppedDataUrl: any = "";
    Qiniu = this.serHelper.serQiniu.Create();
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public Upload: any,
        public $cookies: any,
    ) {
        console.info(Upload);
        var url = this.get_upload_url('demo/upload');
        this.uploader = new plupload.Uploader({
            browse_button: 'uploadfile',
            url: url,
            headers: { 'sso-token': this.$cookies.get('sso-token') },
        });

        this.uploader.bind('FilesAdded', function (up, files) {
            console.info('plupload FilesAdded', up, files);
        });
        this.uploader.bind('UploadComplete', function (up, files) {
            console.info('plupload UploadComplete', up, files);
        });
        this.uploader.init();

        // var that = this;
        // that.qiniu_files = [];
        // this.qiniu_uploader = Qiniu.uploader({
        //     runtimes: 'html5,flash,html4',
        //     browse_button: 'pickfiles',
        //     // container: 'container',
        //     // drop_element: 'container',
        //     max_file_size: '1000mb',
        //     // flash_swf_url: '//cdn.bootcss.com/plupload/2.2.1/Moxie.swf',
        //     // dragdrop: true,
        //     chunk_size: '4mb',
        //     uptoken_url: '/qiniu/UpToken',
        //     domain: 'http://olt0mifi5.bkt.clouddn.com',//http://dn-yinzx.qbox.me/',
        //     get_new_uptoken: false,
        //     // downtoken_url: '/downtoken',
        //     unique_names: true,
        //     auto_start: false,
        //     // log_level: 5,
        //     init: {
        //         // 'FilesAdded': function (up, files) {
        //         //     console.info('qiniu FilesAdded', up, files);
        //         // },
        //         'BeforeUpload': function (up, file) {
        //             console.info('qiniu BeforeUpload', up, file);
        //         },
        //         // 'UploadProgress': function (up, file) {
        //         //     console.info('qiniu UploadProgress', up, file);
        //         // },
        //         'UploadComplete': function () {
        //             console.info('qiniu UploadComplete', that.qiniu_files);
        //         },
        //         'FileUploaded': function (up, file, info) {
        //             console.info('qiniu FileUploaded', file, info);
        //             var sourceLink = `http://olt0mifi5.bkt.clouddn.com/${file.target_name}?imageView2/2/w/100/q/100/format/png`;
        //             console.log(sourceLink);
        //             $scope.$apply(function () {
        //                 that.qiniu_files.push(sourceLink);
        //             });
        //         },
        //         'Error': function (up, err, errTip) {
        //             console.info('qiniu Error', up, err);
        //         }
        //     }
        // });

        this.Qiniu.config.init.FileUploaded = (up, file, info) => {
            var sourceLink = `http://olt0mifi5.bkt.clouddn.com/${file.target_name}?imageView2/2/w/100/q/100/format/png`;
            $scope.$apply(() => {
                this.qiniu_files.push(sourceLink);
            });
        };
        this.qiniu_uploader = this.Qiniu.UploadInit();
    }

    qiniuUpload() {
        this.qiniu_uploader.start();
    }

    get_upload_url(url) {
        return this.serHelper.serHTTP.http_wrapper(url);
    }

    upload() {
        console.info('plupload....')
        this.uploader.start();
    }

    ngSelectAndUploadFile($file) {
        this.ng_upload('/demo/upload', { file: $file, tag: 1, name: 'abc' });
    }

    ngSelectAndUploadFiles($files) {
        this.ng_upload('/demo/UploadFiles', { files: $files, tag: 2, name: 'cba' });
    }

    ngUploadFile() {
        this.ng_upload('/demo/upload', { file: this.file, tag: 1, name: 'abc' });
    }

    ngUploadFiles() {
        this.ng_upload('/demo/UploadFiles', { files: this.files, tag: 2, name: 'cba' });
    }

    ng_upload(url, data) {
        console.log('ng-upload post', url, data);
        this.Upload.upload({
            url: this.get_upload_url(url),
            data: data
        }).then(function (resp) {
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            console.log('ngUpload Success ' + JSON.stringify(resp.data));
        }, function (resp) {
            console.log('ngUpload Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = 100.0 * evt.loaded / evt.total;
            console.log('ngUpload progress: ' + progressPercentage + '% ');
        });
    }
    qiniuBase64() {
        var pic = "填写你的base64后的字符串";
        //注意这个url,可以指定key(文件名), mimeType(文件类型)
        var url = "http://olt0mifi5.bkt.clouddn.com";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                //这里可以判断图片上传成功,而且可以通过responseText获取图片链接
                var data = JSON.parse(xhr.responseText)
                //图片链接就是yourcdnpath.xx/data.key
                document.getElementById("myDiv").innerHTML = xhr.responseText;
            }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Authorization", "UpToken  填写你从服务端获取的上传token");
        xhr.send(pic);
    }
}