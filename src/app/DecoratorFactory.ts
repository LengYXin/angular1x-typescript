/**
 * 装饰器工厂
 */
/**
 *  控制器的装饰器
 */
interface controllerCot {
    /**
     * 导入服务
     */
    $inject?: string[];
    /**
     * 路由参数
     */
    $stateParams?: string[];
    /**
     * 名称  （路由名称）
     */
    $Name?: string;
    /**
     * 配置视图
     */
    $Views?: { [name: string]: ng.ui.IState };
    /**
     * 配置路由  自定义开发
     */
    // $IState?: ng.ui.IState[];
    /**
     * 权限
     */
    $Jurisdiction?: string[];
}
export function controller(objcot: controllerCot) {
    return function (target: Function) { //  这是装饰器
        if (!objcot.$inject) {//默认导入这3 个 模块
            objcot.$inject = ['$scope', 'serHelper', 'serBusiness'];
        }
        // 静态配置字段 复制给当前类的 静态属性
        for (var key in objcot) {
            if (objcot.hasOwnProperty(key)) {
                if (key.indexOf("$") == 0) {
                    target[key] = objcot[key];
                }
            }
        }
        /**
         * 如果没有配置 静态的 $inject 则自动获取构造中的注入
         * 方法无效  因为 压缩后根本获取不到 完整的 服务名称
         */
        // if (target.$inject && target.$inject.length) {
        // } else {
        //     let inject = target.toString().match(/controllers.*?\(.*?\)/)[0].match(/\(.*?\)/)[0].replace(/\(|\)/g, "").split(",").map(x => {
        //         return x.trim();
        //     });
        //     target.$inject = inject;
        //     // console.log("object", target.toString());
        //     // console.log("object", inject);
        // }
    }
}

export function service(objcot?: any) {
    // console.log("controller装饰器", objcot);
    return function (target: Function) { //  这是装饰器
        console.log("service", target);
    }
}