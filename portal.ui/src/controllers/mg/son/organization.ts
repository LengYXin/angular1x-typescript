import { serHelper, serBusiness } from '../../../service';

/**
 * 组织架构
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = ["id"];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,

    ) {
        console.log("组织架构 控制器", this);
        // this.serBusiness.serApi.user.findInfo_myinfo.then(x => {
        //     angular.extend(this.organization.findInfo, x);
        // });
        this.organization.findInfo = this.serBusiness.serApi.user.findUserByEmplid(this.serBusiness.serUserContext.UserContext.uid);
        this.getTeamMember();
    }
    search;
    organization = {
        findInfo: {},
        TeamMember: []
    };
    Loading = false;
    getOrganization(emplid) {
        this.serBusiness.serApi.user.getTeamMember(emplid || null).then(x => {
            if (x && x.length > 0) {
                this.serHelper.$state.go("mg.organization", { id: emplid });
            } else {
                this.serHelper.toastr.warning('Ta没有团队成员!');
            }
        });
    }
    // 获取 团队成员
    getTeamMember(t: any = {}) {
        this.Loading = true;
        t.emplid = this.serHelper.$stateParams.id == 0 ? null : this.serHelper.$stateParams.id;
        if (t.emplid) {
            this.organization.findInfo = this.serBusiness.serApi.user.findUserByEmplid(t.emplid);
        }
        this.serBusiness.serApi.user.getTeamMember(t.emplid || null).then(x => {
            if (x && x.length > 0) {
                this.organization.TeamMember = x;
                this.Loading = false;
            } else {
                this.Loading = false;
                this.serHelper.toastr.warning('Ta没有团队成员!');
            }
        });
    }
}
