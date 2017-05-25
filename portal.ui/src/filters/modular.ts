/*此文件由node自动生成 无需修改 （BuildingPlugin.js） */
//filters
let modularList: { name: string, val: any }[] = [];
//   public/applyType
import applyType from './public/applyType';
modularList.push({ name: 'applyType',  val:applyType.$instance});
//   public/dateFormat
import dateFormat from './public/dateFormat';
modularList.push({ name: 'dateFormat',  val:dateFormat.$instance});
//   public/img
import img from './public/img';
modularList.push({ name: 'img',  val:img.$instance});
//   public/trustAsHtml
import trustAsHtml from './public/trustAsHtml';
modularList.push({ name: 'trustAsHtml',  val:trustAsHtml.$instance});
//   test/samTest
import samTest from './test/samTest';
modularList.push({ name: 'samTest',  val:samTest.$instance});
export { modularList };