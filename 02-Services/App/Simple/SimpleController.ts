module App.Simple {

    // new simple controller
    class SimpleController {
        title: string;
        constructor() {
            this.title = "02 a new controller for services";
        }
    }

    //we need to register the controller to the module
    angular.module("SimpleModule")
        .controller("SimpleController", SimpleController);
}