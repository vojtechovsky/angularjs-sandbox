module App {

    class Configuration {

        static $inject = ["$stateProvider"];
        constructor(private stateProvider: angular.ui.IStateProvider) {
            this.init();
        }

        private init(): void {
            this.stateProvider
                .state("simple", <ng.ui.IState>
                {
                    url: "/simple",
                    controller: "SimpleController",
                    controllerAs: "controller",
                    templateUrl: "App/Simple/SimpleView.html"
                })
                .state("github", <ng.ui.IState>
                {
                    url: "/github",
                    controller: "GitHubController",
                    controllerAs: "controller",
                    templateUrl: "App/GitHub/GitHubView.html"
                })
                .state("video", <ng.ui.IState>
                    {
                        url: "/video",
                        controller: "VideoController",
                        controllerAs: "controller",
                        templateUrl: "App/ApiaryVideo/VideoView.html"
                })
                .state("person", <ng.ui.IState>
                {
                    url: "/person",
                    controller: "PersonController",
                    controllerAs: "controller",
                    templateUrl: "App/Person/PersonView.html"
                })
                .state("mathematic", <ng.ui.IState>
                {
                    url: "/mathematic",
                    controller: "MathController",
                    controllerAs: "controller",
                    templateUrl: "App/Mathematic/MathView.html"
                });
        }
    }

    // 
    // this is the main application module
    //
    // create a new module called "DemoServiceModule" and we need 
    // "CommonServices" as the module dependency
    //var app = angular.module("DemoServiceModule", ["ui.router", "CommonServices"]);

    //app.config(
    //[
    //    "$stateProvider", // more dependencies
    //    ($stateProvider) => {
    //        return new Configuration($stateProvider);
    //    }
    //]);
    let app = angular.module("DemoServiceModule", ["ui.router", "CommonServices"]);
    app.config(["$stateProvider", ($stateProvider) => { return new Configuration($stateProvider); }]);

    //default route to go on the app initialization
    app.run(["$state", $state => { $state.transitionTo("mathematic"); }]);
}