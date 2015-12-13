module App.Home {
    
    class HomeController {

        gotoState: string;
        isFront: boolean[];

        static $inject = ["$state"];
        constructor(private $state: angular.ui.IStateService) {
            this.gotoState = "mathematic";
            this.isFront = [];
        }

        public getState() {
            this.$state.go(this.gotoState);
        }

        public toggleClass(id: number) {
            this.isFront[id] = !this.isFront[id];
        }

    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("HomeController", HomeController);
}