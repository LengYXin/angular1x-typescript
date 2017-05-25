import { serHelper, serBusiness } from '../../service';

/**
 * 内部推荐
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        this.init();
        console.log(this);
    }
     // 宝典
    stars = this.serBusiness.serApi.push.findPush;
    pushcarousel: yxInterface.ISwiperCarouselfigureConfig = {
        dataList: this.serBusiness.serApi.basekv.findCarouselByKey("selfhelper.pushcarousel",1692,300)
    };
    tagcarousel: yxInterface.ISwiperCarouselfigureConfig = {
        dataList: this.serBusiness.serApi.basekv.findCarouselByKey("selfhelper.tagcarousel",400,120)
    };
    queryTagList = this.serBusiness.serApi.push.queryTagList;
    mychart: any = {};
    //tag云图
    option = null;
    // 分页配置
    pagingConfig = {
        //数据存储集合
        item: [],
        //参数
        params: {
            pageIndex: 1,
            // pageSize: 1
        },
        //启用地址 默认 false
        // state: true,
        onCallback: (x, c) => {
            this.serBusiness.serApi.activity.queryAll(this.pagingConfig.params).then(x => {
                c(x);
            });
        }
    };
    tagContents = [];
    insTag(txt) {
        let index = 0;
        if (this.tagContents.some((x, i) => {
            if (x.name == txt) {
                index = i;
                return true;
            } else {
                return false;
            }
        })) {
            this.tagContents[index].value++;
        } else {
            this.tagContents.push({ name: txt, value: 1 });
        }
    }
    init() {
        this.serBusiness.serApi.activity.queryAll(this.pagingConfig.params).then(x => {
            this.pagingConfig.item = x;
        });
        this.serBusiness.serApi.push.queryTag.then(data => {

            data.forEach(e => {
                this.insTag(e.tagContent);
            });
            this.option = {
                title: {
                },
                backgroundColor: '#F7F7F7',
                tooltip: {
                    show: true
                },
                series: [{
                    type: 'wordCloud',
                    gridSize: 20,
                    sizeRange: [12, 25],
                    rotationRange: [1, Math.round(Math.random() * 60)],
                    shape: 'circle',
                    textStyle: {
                        normal: {
                            color: function () {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: this.tagContents
                }]
            }
        });
    }
    addpushLike(star) {
        //console.log("this.star", star);
        this.serBusiness.serApi.push.updateLikeCount({ pushid: star.push_id }).then(x => {
            if (star.isLike == "Y") {
                star.isLike = "N";
                star.like_count--;
            }
            else {
                star.isLike = "Y";
                star.like_count++;
            }
        })
    }
    WordCloudStr = "";
    addWordCloud() {
        this.WordCloudStr = "";
        this.serHelper.ngDialog.open({
            template: "templates/ser/dialog-WordCloud.tpl.html",
            // plain: true,
            showClose: true,
            width:500,
            scope: this.$scope,
            className: 'ngdialog-theme-default ngdialog-minbtns-comment'
        });
    }
    submitWordCloud(str) {
        console.log(str, this.mychart);
        this.serBusiness.serApi.push.addTag(str).then(x => {
            this.serHelper.toastr.success("添加完成！", "", { timeOut: 700, allowHtml: true });
            this.insTag(str);
            this.option.series[0].data = this.tagContents;
            this.mychart.setOption(this.option);
            this.serHelper.ngDialog.closeAll();
        }).catch(x => {
            this.serHelper.toastr.error(x, { timeOut: 1000, allowHtml: true });
        });
    }
}
