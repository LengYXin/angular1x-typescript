import { serHelper, serBusiness } from '../../../service';

/**
 * 团队成员
 */
export default class controllers {
    //angular 注入   
    static $inject = ['$scope', 'serHelper', 'serBusiness'];
    //路由参数
    static $stateParams = [];
    constructor(
        public $scope: ng.IScope,
        public serHelper: serHelper,
        public serBusiness: serBusiness,
    ) {
        this.getTeamMember();
    }
    search;
    TeamMember = [];
    TeamMemberCache = [];
    // 获取 团队成员
    getTeamMember(t: any = {}) {
        if (t.TeamMember && t.TeamMember.length > 0) {
            return t.TeamMemberDisplay = !t.TeamMemberDisplay;
        }
        this.serBusiness.serApi.user.getTeamMember(t.emplid || null).then(x => {
            if (x && x.length > 0) {
                if (t.emplid) {
                    t.TeamMember = x;
                } else {
                    this.TeamMember = x;
                    this.TeamMemberCache = x;
                }
                t.TeamMemberDisplay = true;
                // this.TeamMemberCache = this.TeamMember;
                // angular.extend(this.TeamMemberCache, this.TeamMember);
            } else {
                this.serHelper.toastr.warning('Ta没有团队成员!');
            }
        });
    }
    searchTimeout;
    searchChange(s) {
        if (this.searchTimeout) {
            this.serHelper.$timeout.cancel(this.searchTimeout);
        }
        if (!s || !s.length) {
            this.TeamMember = angular.extend([], this.TeamMemberCache);
            // angular.extend(this.TeamMember, this.TeamMemberCache);
            return;
        }
        this.searchTimeout = this.serHelper.$timeout(() => {
            // console.log(s);

            this.serBusiness.serApi.user.search(s).then(x => {
                this.TeamMember = x;
                if (x && x.length > 0) {
                    // this.TeamMember = x;
                }
            });
        }, 800);
    }
}
