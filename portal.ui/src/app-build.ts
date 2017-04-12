import './baseClass/templates.js';     //html 模板
import * as GlobalConfig from './config';             //全局配置
import start from "./start";//启动项目
GlobalConfig.buildFN();
new start(['templates']);
