module App.Simple {
    class SimpleController {

        title: string;

        constructor() {
            this.title = "Simple Controller";
        }
    }

    //angular please give me back the instance of the module
    // and register a new controller object
    angular.module("SimpleModule")
        .controller("SimpleController", SimpleController);
}