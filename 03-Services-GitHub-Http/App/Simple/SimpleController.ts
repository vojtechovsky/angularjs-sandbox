module App.Simple {

    class SimpleController {
        title: string;

        constructor() {
            this.title = "03-ctrl title";
        }
    }
    //registration of the controller
    angular.module("GitHubModule")
        .controller("SimpleController", SimpleController);
}