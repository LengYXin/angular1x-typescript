// import serHelper  from '../services/serHelper';

// /**
//  * Paging 继承类
//  */
// export class Paging implements yxInterface.IPaging {
export class Paging  {
    
//     constructor(
//         public serHelper: serHelper
//     ) {

//     }
//     PagingConfig = { url: "", list: null, params: { pageIndex: 1 }, pageCount: 1, count: 0, LoadingHints: "加载中", cb: null };
//     PagingLoadData() {
//         this.serHelper.serHTTP.post(this.PagingConfig.url, this.PagingConfig.params).success((r: any, p: number, q: number) => {
//             if (this.PagingConfig.cb) this.PagingConfig.cb(r, p);
//             this.PagingConfig.list = r.Data;
//             this.PagingConfig.pageCount = p;
//             this.PagingConfig.count = q;
//         }).error(e => {
//             this.PagingConfig.LoadingHints = e;
//         });
//     }
}