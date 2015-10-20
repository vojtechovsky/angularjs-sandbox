module App.Home {
    
    class HomeController {
        static $inject = ["$state"];
        constructor(private $state: angular.ui.IStateService) {  }
    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("HomeController", HomeController);
}