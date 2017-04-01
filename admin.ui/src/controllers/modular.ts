/*此文件由node自动生成 无需修改 （BuildingPlugin.js） */
//controller
let modularList: yxInterface.ControllerModular[] = [];
//   demo/chart
import chart_ from './demo/chart';
modularList.push({ name: 'demo/chart', url: 'demo/chart', val:chart_ });
//   demo/dialog
import dialog_ from './demo/dialog';
modularList.push({ name: 'demo/dialog', url: 'demo/dialog', val:dialog_ });
//   demo/Editor
import Editor_ from './demo/Editor';
modularList.push({ name: 'demo/Editor', url: 'demo/Editor', val:Editor_ });
//   demo/form
import form_ from './demo/form';
modularList.push({ name: 'demo/form', url: 'demo/form', val:form_ });
//   demo/page
import page_ from './demo/page';
modularList.push({ name: 'demo/page', url: 'demo/page', val:page_ });
//   login/login
import login_ from './login/login';
modularList.push({ name: 'login', url: 'login/login', val:login_ });
export { modularList };