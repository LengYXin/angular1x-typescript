
/**************************************
   ******       serBusiness  业务逻辑服务 综合类
  ************************************/
import * as GlobalConfig from '../../config';
import serUser from './serUser';
import serHr from './serHr';
import serAmaldar from './serAmaldar';
import serKnowledge from './serKnowledge';
import serPersonal from './serPersonal';
import serSelfService from './serSelfService';


export default class {
    //服务器类型 默认为 service 
    static $type = GlobalConfig.EnumServicesType.service;
    static $inject = ['serUser', 'serHr', 'serAmaldar', 'serKnowledge', 'serPersonal', 'serSelfService'];
    constructor(
        public serUser: serUser,
        public serHr: serHr,
        public serAmaldar: serAmaldar,
        public serKnowledge: serKnowledge,
        public serPersonal: serPersonal,
        public serSelfService: serSelfService,
    ) {
        GlobalConfig.debug ? console.debug("serBusiness", this) : undefined;
    }
}