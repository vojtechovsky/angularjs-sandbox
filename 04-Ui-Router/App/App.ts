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
    angular.module("DemoServiceModule", ["ui.router", "CommonServices"])
        .config(
        ["$stateProvider", ($stateProvider) => { return new Configuration($stateProvider); }]);
}