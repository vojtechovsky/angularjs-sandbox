module App {

    class HomeState implements angular.ui.IState {
        name = "home";
        url = "/home";
        controller = "HomeController";
        controllerAs = "controller";
        templateUrl = "App/HomeView.html";
        children = [
            new App.Mathematic.MathState()
        ];
    }

    class AppConfiguration {
        static $inject = ["$stateProvider"];
        constructor(private stateHelperProvider: angular.ui.IStateProvider) {
            stateHelperProvider.state(new HomeState());
          //  stateHelperProvider.state(new App.Mathematic.MathState());
        }
    }

    class Configuration {

        static $inject = ["$stateProvider"];
        constructor(private stateProvider: angular.ui.IStateProvider) {
            this.init();
        }

        private init(): void {
            this.stateProvider
                .state("mathematic", <ng.ui.IState>
                {
                    url: "/mathematic",
                    controller: "MathController",
                    controllerAs: "controller",
                    templateUrl: "App/Mathematic/MathView.html"
                });
        }
    };

    // 
    // this is the main application module
    let app = angular.module("AppMath", ["ui.router",  "CommonServices"]);
    app.config(AppConfiguration);

    //configure the state provider
    //app.config(["$stateProvider", ($stateProvider) => { return new Configuration($stateProvider); }]);

    //default route to go on the app initialization
    app.run(["$state", $state => { $state.transitionTo("home"); }]);
   // app.run(["$state", $state => { $state.transitionTo("home"); }]);
}
