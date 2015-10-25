module Blocks {
    //------------------------------------------------------
    //---                   DIRECTIVE 1
    //
    // * directive without controller and inline template
    //------------------------------------------------------
    export var UserInfoCard = (someService: any): angular.IDirective => {
        return {
            template: "User Info Card: {{controller.user.firstName}}",
            restrict: "AE"
        };
    }

    //including $inject annotations
    UserInfoCard.$inject = ["$timeout"]; 

    //------------------------------------------------------
    //---                   DIRECTIVE 2
    //
    // * directive without controller but with the own template
    //------------------------------------------------------

    export var UserInfoCardTwo = (): angular.IDirective => {
        return {
            templateUrl: "/App/Blocks/UserInfoCardTwo.html",
            restrict: "A"
        };
    }

    //------------------------------------------------------
    //---                   DIRECTIVE 3
    //
    // * directive with own controller and own template
    //------------------------------------------------------

    export class UserInfoCardThreeController {
        scope: any;

        static $inject = ["$scope"];
        constructor($scope: ng.IScope) {
            //assign the scope
            this.scope = $scope;

            //define a method on the scope
            this.scope.unKnightMe = this.unKnightMe;
        }

        /**
         * this method is available only on the directive constructor
         * but we cannot reach the call unless we use either scope
         * and define the method on the scope OR
         * - this case-
         * we define alias for the constructor and set ng-click on that alias!
         * "ng-click='vm.knightMe(user)'"
         * @param usertoKnigh 
         * @returns {} 
         */
        public knightMe(usertoKnigh: App.Directive.User) {
            usertoKnigh.rank = "Knight";
        }

        /**
         * unlike method knightMe this define the method on the scope of the directive
         * we do not need "controller alias"
         * 
         * at the moment this is not the prefferable solution i geuss
         * @param usertoKnigh 
         * @returns {} 
         */
        public unKnightMe(usertoKnigh: App.Directive.User) {
            usertoKnigh.rank = null;
        }
    }

    export var UserInfoCardThree = (): angular.IDirective => {
        return {
            templateUrl: "/App/Blocks/UserInfoCardThree.html",
            restrict: "E",
            controller: UserInfoCardThreeController,
            controllerAs: "vm",
            scope: {
                user : "="
            }
        };
    }

    let module = angular.module("AppMath");
    module.directive("userInfoCard", UserInfoCard);
    module.directive("userInfoCardTwo", UserInfoCardTwo);
    module.directive("userInfoCardThree", UserInfoCardThree);
}