//检查 ng 是否可用  ie8 是 不行的
if (angular.module) {

} else {
    alert("你的浏览器太落后了，做对应的处理");
}
import './baseClass/templates.js';     //html 模板

import start from "./start";//启动项目
new start(['templates']);
