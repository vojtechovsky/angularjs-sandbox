module App.Home {
    
    class HomeController {

        gotoState : string;

        static $inject = ["$state"];
        constructor(private $state: angular.ui.IStateService) {
            this.gotoState = "mathematic";
        }

        public getState() {
            this.$state.go(this.gotoState);
        }

    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("HomeController", HomeController);
}