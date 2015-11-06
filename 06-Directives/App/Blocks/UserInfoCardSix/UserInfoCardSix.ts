module Blocks {

    export class MasterUsersController {
        private scope: any;

        static $inject = ["$scope", "UserListState"];
        constructor($scope: ng.IScope, userListState: IUserListState) {
            //assign the scope
            this.scope = $scope;

            //define a method on the scope
            this.scope.state = userListState;
            userListState.selectedUser = this.scope.users[0];
        }
    };

    //------------------------------------------------------
    //---                   DIRECTIVE 6 - detailUser 
    //
    // * directive with controller and injected service
    //------------------------------------------------------
    export var MasterUsersDirective = (): angular.IDirective => {
        return {
            scope: {
                users: "=data"
            },
            templateUrl: "/App/Blocks/UserInfoCardSix/masterUsers.html",
            controller: MasterUsersController
        };
    }

    //including $inject annotations
    //MasterUsersDirective.$inject = ["$scope"]; 

    export class DetailUsersController {
        private scope: any;
        static $inject = ["$scope", "UserListState"];

        constructor($scope: ng.IScope, userListState: IUserListState) {
            //assign the scope
            this.scope = $scope;

            //define a method on the scope
            this.scope.state = userListState;
        }
    };

    //------------------------------------------------------
    //---                   DIRECTIVE 6 - detailUser 
    //
    // * directive with controller and injected service
    //------------------------------------------------------
    export var DetailUsersDirective = (): angular.IDirective => {
        return {
            scope: {
                users: "=data"
            },
            templateUrl: "/App/Blocks/UserInfoCardSix/detailUsers.html",
            controller: DetailUsersController
        };
    }

   let module = angular.module("AppMath");
   module.directive("detailUsers", DetailUsersDirective);
   module.directive("masterUsers", MasterUsersDirective);
}