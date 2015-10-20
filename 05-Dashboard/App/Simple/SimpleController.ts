module App.Simple {
    //*
    // simple controller has just two properties
    // - title
    //
    // - injected two services. the very easy ones
    //*
    class SimpleController {
        title: string;
        serviceName: string;
        
        static $inject = ["SimpleService", "$state"];
        constructor(private service: ISimpleService, private $state: angular.ui.IStateService) {

            this.title = "CONTROLLER is alive! ";
            this.serviceName = service.getServiceName();
        }
    }

    class SimpleChildController {
        childTitle: string;

        static $inject = ["parentServiceName"];
        constructor(private parentServiceName:string) {
            this.childTitle = "Child Controller is Alive!, parentServiceName: " + parentServiceName;
        }
    }

    //registration of the controller
    // give me module "dashboardApplication"
    var module = angular.module("dashboardApplication");

    //register new controller "SimpleController" into module "dashboardApplication"
    module.controller("SimpleController", SimpleController);
    module.controller("SimpleChildController", SimpleChildController);

}