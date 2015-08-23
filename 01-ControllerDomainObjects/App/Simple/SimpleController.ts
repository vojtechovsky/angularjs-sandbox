module App.Simple {
    class SimpleController {

        title: string;

        constructor() {
            this.title = "Simple Controller";
        }
    }

    angular.module("SimpleModule", [])
        .controller("SimpleController", SimpleController);
}