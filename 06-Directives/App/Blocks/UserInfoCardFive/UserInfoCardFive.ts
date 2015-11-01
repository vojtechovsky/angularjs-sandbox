module Blocks {

    //------------------------------------------------------
    //---                   DIRECTIVE 5
    //
    // * directive with own controller and own template
    // * split the logic into two independent directives
    // * a) one for card
    // * b) one for address
    //------------------------------------------------------
    export class UserInfoCardFiveController {
        private isCollapsedCard: boolean;
        private isBlinking: boolean;
        private element: ng.IAugmentedJQuery;

        private promiseForInterval: ng.IPromise<void>;

        static $inject = ["$scope", "$interval"];

        constructor(private $scope: ng.IScope, private $interval: ng.IIntervalService) {
            this.isCollapsedCard = (<any>$scope).collapsed === "true";
        }

        collapseCard() {
            this.isCollapsedCard = !this.isCollapsedCard;
        }

        toggleInterval() {
            this.element = (<any>this.$scope).element;
            this.isBlinking = !this.isBlinking;
            this.doBlinking();
        }

        doBlinking() {
            // save the timeoutId for canceling
            if (this.isBlinking) {
                if (!this.promiseForInterval) {
                    this.promiseForInterval = this.$interval((): void => this.intervalExecution(), 500);
                }
            } else {
                if (this.promiseForInterval) {
                    this.$interval.cancel(this.promiseForInterval);
                    this.promiseForInterval = null;
                }
            }
        }

        intervalExecution() {
            {
                this.element.children().toggleClass("panel-primary");
            }
        }
    }


    export var UserInfoCardFiveDirective = (): angular.IDirective => {
        return {
            templateUrl: "/App/Blocks/UserInfoCardFive/UserInfoCardFive.html",
            restrict: "E",
            controller: UserInfoCardFiveController,
            controllerAs: "vm",
            scope: {
                //this means we are expecting to get into scope object called "user" => $scope.user
                //but in the attribute in html we can call it "person" => <user-info-card-four person="controller.user2"></user-info-card-four>
                user: "=person",
                collapsed: "@"
            },
            // http://stackoverflow.com/questions/31582113/angular-2-set-focus-to-another-input

            link: ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => {
                (<any>$scope).element = $element;
            }
        };
    }; 

    let module = angular.module("AppMath");
    module.directive("userInfoCardFive", UserInfoCardFiveDirective);
}