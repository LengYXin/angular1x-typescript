/*此文件由node自动生成 无需修改 （BuildingPlugin.js） */
//services
let modularList: { name: string, val: { $type?: any } }[] = [];
//   business/serAmaldar
import serAmaldar from './business/serAmaldar';
modularList.push({ name: 'serAmaldar',  val:serAmaldar});
//   business/serBusiness
import serBusiness from './business/serBusiness';
modularList.push({ name: 'serBusiness',  val:serBusiness});
//   business/serHr
import serHr from './business/serHr';
modularList.push({ name: 'serHr',  val:serHr});
//   business/serKnowledge
import serKnowledge from './business/serKnowledge';
modularList.push({ name: 'serKnowledge',  val:serKnowledge});
//   business/serPersonal
import serPersonal from './business/serPersonal';
modularList.push({ name: 'serPersonal',  val:serPersonal});
//   business/serSelfService
import serSelfService from './business/serSelfService';
modularList.push({ name: 'serSelfService',  val:serSelfService});
//   business/serUser
import serUser from './business/serUser';
modularList.push({ name: 'serUser',  val:serUser});
//   helper/serHelper
import serHelper from './helper/serHelper';
modularList.push({ name: 'serHelper',  val:serHelper});
//   helper/serHTTP
import serHTTP from './helper/serHTTP';
modularList.push({ name: 'serHTTP',  val:serHTTP});
//   helper/serHttpInterceptor
import serHttpInterceptor from './helper/serHttpInterceptor';
modularList.push({ name: 'serHttpInterceptor',  val:serHttpInterceptor});
//   helper/serQiniu
import serQiniu from './helper/serQiniu';
modularList.push({ name: 'serQiniu',  val:serQiniu});
//   helper/serSession
import serSession from './helper/serSession';
modularList.push({ name: 'serSession',  val:serSession});
//   helper/serStorage
import serStorage from './helper/serStorage';
modularList.push({ name: 'serStorage',  val:serStorage});
//   helper/serTemplateLoader
import serTemplateLoader from './helper/serTemplateLoader';
modularList.push({ name: 'serTemplateLoader',  val:serTemplateLoader});
export { modularList };