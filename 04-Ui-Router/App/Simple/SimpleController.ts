module App.Simple {
    //*
    // simple controller has just two properties
    // - title
    //
    // - injected one service. the very easy one
    //*
    class SimpleController {
        title: string;
        serviceName : string;

        static $inject = ["SimpleService"];
        constructor(private service: App.Simple.SimpleService) {

            this.title = "CONTROLLER is alive! ";
            this.serviceName = service.getServiceName();
        }
    }

    //registration of the controller
    // give me module "DemoServiceModule"
    var module = angular.module("DemoServiceModule");

    //register new controller "SimpleController" into module "DemoServiceModule"
    module.controller("SimpleController", SimpleController);

}