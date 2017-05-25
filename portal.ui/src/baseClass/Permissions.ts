import serHelper from '../services/helper/serHelper';
/**
 * 权限处理
 */
export default class Permissions {
    //是否拥有权限
    Jurisdiction: boolean = false;
    constructor(
        public serHelper: serHelper,
        public thisPermissions: any[],
    ) {
        // console.info("当前控制器权限", this.thisPermissions, this.serHelper.$rootScope.$rootUserContext);

        if (this.thisPermissions) {
            console.info(`当前控制器所需权限 ${this.thisPermissions.toString()}  已拥有 ${this.serHelper.$rootScope.$rootUserContext.role.toString()}`);
            this.serHelper.$rootScope.$rootUserContext.role.forEach(x => {
                if (this.Jurisdiction) return;
                if (this.thisPermissions.indexOf(x) != -1) this.Jurisdiction = true;
            });
            if (this.Jurisdiction) {

            } else {
                this.serHelper.toastr.error('您没有权限访问!', '提示!');
                this.serHelper.$state.go("home");
            }
        }
    };

}
