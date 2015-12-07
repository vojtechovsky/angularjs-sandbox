module App {

    class AppConfiguration {
        static $inject = ["$stateProvider"];
        constructor(private stateHelperProvider: angular.ui.IStateProvider) {
            stateHelperProvider.state(new App.Home.HomeState());
            stateHelperProvider.state(new App.Mathematic.R1State());
            stateHelperProvider.state(new App.Mathematic.R2State());
            stateHelperProvider.state(new App.Mathematic.R3State());
        }
    }

    //class AllInOneConfiguration {

    //    static $inject = ["$stateProvider"];
    //    constructor(private stateProvider: angular.ui.IStateProvider) {
    //        this.init();
    //    }

    //    private init(): void {
    //        this.stateProvider
    //            .state("mathematic", <ng.ui.IState>
    //            {
    //                url: "/mathematic",
    //                controller: "MathController",
    //                controllerAs: "controller",
    //                templateUrl: "App/Mathematic/MathView.html"
    //            });
    //    }
    //};

    // 
    // this is the main application module
    let app = angular.module("AppMath", ["ui.router",  "CommonServices"]);
    app.config(AppConfiguration);

    //configure the state provider
    //app.config(["$stateProvider", ($stateProvider) => { return new AllInOneConfiguration($stateProvider); }]);

    //default route to go on the app initialization
   // app.run(["$state", $state => { $state.transitionTo("home"); }]);
    app.run(["$state", $state => { $state.transitionTo("home"); }]);
}
