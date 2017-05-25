/**
 * Swiper 轮播图组件
 */
import * as GlobalConfig from '../../config';
import { serHelper, serBusiness } from '../../service';
export default class directive implements ng.IDirective {
    static $instance = (): ng.IDirective => {
        return new directive();
    };
    constructor() { }
    scope = {
        swiperconfig: "="
    };
    restrict = 'AE';
    replace = true;
    controller = Controller;
    controllerAs = "swiper";
    template = (e, a) => {
        let html;
        if (a.swiperconfig) {
            html = `
           <div class="swiper-container  swiper-slide-carouselfigure">
                <div class="swiper-wrapper ">
                    <div class="swiper-slide" ng-repeat="t in swiper.swiperconfig.dataList" sam-Repeatlast="swiper.init()">
                     <div class="swiper-slide-carouselfigure-img"  ng-bind-html="t"></div>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
                <!-- Add Arrows -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            `;
        } else {
            html = `<h1 class="text-center">没有配置swiperconfig</h1>`;
        }
        return html;
    };
    link(scope: ng.IScope, element: ng.IRootElementService, attrs: ng.IAttributes) {
    };
}
class Controller {
    static $inject = ['$scope', '$element', '$timeout'];
    constructor(
        private $scope: ng.IScope,
        private $element: ng.IRootElementService,
        private $timeout: ng.ITimeoutService
    ) {
        // 获取配置 和数据
        this.swiperconfig = this.$scope.swiperconfig || {};
        //默认配置
        this.config = {
            pagination: this.$element.find('.swiper-pagination'),
            nextButton: this.$element.find('.swiper-button-next'),
            prevButton: this.$element.find('.swiper-button-prev'),
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
            grabCursor: true,
            loop: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false,
            autoHeight: true
        };
        //基础 配置
        angular.extend(this.config, this.swiperconfig.SwiperConfig);

        // this.$scope.$watch("swiper.swiperconfig.dataList", x => {
        //     console.log(x);
        //     if (this.swiper) {
        //         this.swiper.destroy(false);
        //         // this.init();
        //     }
        // });
    }
    swiper;
    swiperconfig: yxInterface.ISwiperCarouselfigureConfig;
    config;
    //初始化 swiper
    init() {
        this.swiper ? this.swiper.destroy(false) : undefined;
        this.$timeout(x => {
            this.swiper = new Swiper(this.$element, this.config);
        });
        this.$scope.$on("onShrinkNav",x=>{
            this.swiper.update(true);
        });
    }
}