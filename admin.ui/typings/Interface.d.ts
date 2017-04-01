// 定义接口 
import yxInterface = Interface;
declare var Swiper: any;
interface Swiperinterface {

}

declare module 'yxInterface' {
    export = Interface;
}

declare namespace Interface {
    /**
     * 控制器 模块 用来  很复杂 没想好 路由需要
     */
    interface ControllerModular {
        name?: string,
        url?: string,
        val?: { $stateParams?: string[], $IState?: ng.ui.IState }
    }
    /**
     * 分页
     */
    interface IPaging {
        //加载数据的配置 
        PagingConfig: { url: string, list: any, params: any, pageCount: number, count: number };
        //加载数据的方法
        PagingLoadData(index?: number, Callback?: Function): void;
    }
}