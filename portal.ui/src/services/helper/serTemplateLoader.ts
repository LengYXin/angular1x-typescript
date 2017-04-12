
/**************************************
   ******      加载模板页
   加载 使用了模板引擎的页面
    Lyx_TemplateLoader.load("templates/common/popover_test.html").then(function (templateString) {
      console.log(templateString);
    })
  ************************************/
export default class  {
    static $inject = ['$http', '$templateCache'];
    constructor(
        private $http: ng.IHttpService,
        private $templateCache: ng.ITemplateCacheService
    ) {

    }
    load(url) {
        return this.$http.get(url, { cache: this.$templateCache })
            .then(function (response: any) {
                return response.data && response.data.trim();
            });
    }
}