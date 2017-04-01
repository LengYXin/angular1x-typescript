
/**
 * HTTP请求拦截
 */

export  default class  implements ng.IHttpInterceptor {
    // static $inject = ['$rootScope','$cookies'];
    constructor(
        private $rootScope: ng.IRootScopeService,
        private $cookies:any,
    ) {
        
    }
    public request = (config: ng.IRequestConfig) => {
        // console.log(config);
        //可以再这里统一加入authentic 信息
        // if (!config.headers.Authorization) {
        // console.log($rootScope);
        //  config.headers.Authorization = 'Basic ' + localStorage.getItem('token');
        //自定义认证标头
        // var itcode = $rootScope.rootUserToken;
        // //config.headers.Authorization = 'Lelife ' + itcode;//'liuyi2';
        // config.headers.Authorization = itcode; //'liuyi2';

        // if ($rootScope.rootUser && $rootScope.rootUser.employee && $rootScope.rootUser.employee.lastRegion) {
        //     config.headers.Region = $rootScope.rootUser.employee.lastRegion;
        // }
        // }
        
        config.headers = config.headers || {};
        config.headers['sso-token'] = this.$cookies.get('sso-token');        
        return config;
    };
    response(response1) {
        if (response1.status == 200) {
            //document.getElementById('logindiv').style.display = "none";
            //console.log("201");
            // console.log(response1);
        }
        return response1;
    };
    responseError(response1: ng.IHttpPromiseCallbackArg<any>) {
        // console.error("请求错误", response1);
        // this.$rootScope.$broadcast('scroll.refreshComplete');
        // this.$rootScope.$broadcast('scroll.infiniteScrollComplete');
        if (response1.status == 401) {
            console.log("need login");
            //拦截器处理的方式
            // document.getElementById('logindiv').style.display = "block";
            //
            // $state.go('login'); 这里使用state 不知道怎么声明
            //window.location.href = '#/login';
        }
        return response1;
    };
    requestError(request1) {
        return request1;
    };
}
