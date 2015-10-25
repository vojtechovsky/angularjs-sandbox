module App {

    class Configuration {

        static $inject = ["$stateProvider"];
        constructor(private stateProvider: angular.ui.IStateProvider) {
            this.init();
        }

        private init(): void {
            this.stateProvider
                .state("directive1", <ng.ui.IState>
                {
                    url: "/directive1",
                    controller: "DirectiveController",
                    controllerAs: "controller",
                    templateUrl: "App/Directive/DirectiveView.html"
                })
                .state("directive4", <ng.ui.IState>
                {
                    url: "/directive4",
                    controller: "DirectiveController",
                    controllerAs: "controller",
                    templateUrl: "App/Directive/DirectiveFourView.html"
                });
        }
    };

    // 
    // this is the main application module
    let app = angular.module("AppMath", ["ui.router",  "CommonServices"]);

    //configure the state provider
    app.config(["$stateProvider", ($stateProvider) => { return new Configuration($stateProvider); }]);

    //default route to go on the app initialization
    app.run(["$state", $state => { $state.transitionTo("directive4"); }]);
}
