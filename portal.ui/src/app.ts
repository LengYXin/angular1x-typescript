import start from "./start";//启动项目
console.warn("console  输出 无需注释  打包时自动去除");
new start();
/**
 * app-build  打包入口文件
 * app        开发时程序入口文件
 * config     全局配置文件 （不是 windows 作用域的全局，是程序的全局）
 * css        样式文件
 * monitor    全局监控文件
 * route      路由文件   根据控制器（controllers/modular.ts）返回的 name 和 url 生成对应的路由 
 * service    开发时使用的  提示文件 供开发时使用
 * start      ng程序启动文件 
 *               
 *      ---------------程序启动过程-------------------
 *       app.ts  >  start.ts   >  route.ts
 *      ---------------------------------------------
 *      --------app.ts & app-build.ts--------
 *           new start() > start.ts
 * 
 *      --------start.ts  以下函数按顺序执行 --------
 *                constructor()         构造函数 查看函数注释
 *                start()               初始化函数  使用ajax 获取 菜单列表 同时创建 $menuPermissions 菜单权限服务（根据菜单的 url 路径 注入 对应的 权限给控制器），
 *                injectServices()      注入服务
 *                injectFilters()       注入过滤器
 *                injectDirective()     注入指令
 *                injectController()    注入控制器
 *                bootstrap()           启动函数   
 *                   → ng.run 
 *                           { 
 *                             中 会获取用户上下文 当获取成功   serUserContext.ts  >  GetUserContext()
 *                              根据用户的角色 处理 $menuPermissions 菜单  serUserContext.ts  >  HandleUserMenuList() 
 *                           }
 *                   → ng.config
 *                           {
 *                              注册 路由  进入   route.ts 文件
 *                              new route($stateProvider, $urlRouterProvider, $menuPermissions);
 *                              --------route.ts  以下函数按顺序执行 --------
 *                                    具体代码 看 注释  route.ts 注释
 *                               constructor() >  ruleTwo() || ruleOne() > resolve() > otherwise()
 *                                    
 *                           } 
 *                ----到这里 ng  程序已经完全启动 
 *                
 *       @冷颖鑫    2017-04-19
 *       896630361@qq.com
 *       lengyx@samsundot.com
 * 
 */