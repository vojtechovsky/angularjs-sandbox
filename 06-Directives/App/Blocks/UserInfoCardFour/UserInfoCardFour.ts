module Blocks {
   
    //------------------------------------------------------
    //---                   DIRECTIVE 4
    //
    // * directive with own controller and own template
    // * split the logic into two independent directives
    // * a) one for card
    // * b) one for address
    //------------------------------------------------------

    export class UserInfoCardFourController {
        private isCollapsedCard: boolean;

        static $inject = ["$scope"];
        constructor($scope: ng.IScope) {
            this.isCollapsedCard = (<any>$scope).collapsed === "true";
        }

        public collapseCard() {
            this.isCollapsedCard = !this.isCollapsedCard;
        }
    }

    export class UserInfoAddressFourController {
        private isCollapsedAddress: boolean;

        public collapseAddress() {
            this.isCollapsedAddress = !this.isCollapsedAddress;
        }
    }

    export var UserInfoCardDirective = (): angular.IDirective => {
        return {
            templateUrl: "/App/Blocks/UserInfoCardFour/UserInfoCardFour.html",
            restrict: "E",
            controller: UserInfoCardFourController,
            controllerAs: "vm",
            scope: {
                //this means we are expecting to get into scope object called "user" => $scope.user
                //but in the attribute in html we can call it "person" => <user-info-card-four person="controller.user2"></user-info-card-four>
                user: "=person",
                collapsed: "@"
            }
        };
    }

    export var UserInfoAddressDirective = (): angular.IDirective => {
        return {
            templateUrl: "/App/Blocks/UserInfoCardFour/UserInfoFourAddress.html",
            restrict: "E",
            controller: UserInfoAddressFourController,
            controllerAs: "vm",
            scope: {
                address: "="
            }
        };
    }

    let module = angular.module("AppMath");
    module.directive("userInfoCardFour", UserInfoCardDirective);
    module.directive("userInfoAddressFour", UserInfoAddressDirective);
}