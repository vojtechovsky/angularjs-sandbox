module App {

    class Configuration {

        static $inject = ["$stateProvider"];
        constructor(private stateProvider: ng.ui.IStateProvider) {
            this.init();
        }

        private init(): void {
            this.stateProvider
                .state("directive1", <ng.ui.IState>
                {
                    url: "/directive1",
                    controller: "DirectiveController",
                    controllerAs: "controller",
                    templateUrl: "App/DirectiveDemo/DirectiveView.html"
                })
                .state("directive4", <ng.ui.IState>
                {
                    url: "/directive4",
                    controller: "DirectiveController",
                    controllerAs: "controller",
                    templateUrl: "App/DirectiveDemo/DirectiveFourView.html"
                })
                .state("directive5", <ng.ui.IState>
                {
                    url: "/directive5",
                    controller: "DirectiveController",
                    controllerAs: "controller",
                    templateUrl: "App/DirectiveDemo/DirectiveFiveView.html"
                })
                .state("keepFocused", <ng.ui.IState>
                {
                    url: "/keepFocused",
                    controller: "DirectiveController",
                    controllerAs: "controller",
                    templateUrl: "App/DirectiveDemo/KeepFocusedView.html"
                })
                .state("directive6", <ng.ui.IState>
                {
                    url: "/directive6",
                    controller: "DirectiveController",
                    controllerAs: "controller",
                    templateUrl: "App/DirectiveDemo/DirectiveSixView.html"
                });
        }
    };

    // 
    // this is the main application module
    let app = angular.module("AppMath", ["ui.router",  "CommonServices"]);

    //configure the state provider
    app.config(["$stateProvider", ($stateProvider) => { return new Configuration($stateProvider); }]);

    //default route to go on the app initialization
    app.run(["$state", $state => { $state.transitionTo("directive6"); }]);
}
