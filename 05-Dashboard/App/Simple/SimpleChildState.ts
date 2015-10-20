module App.Simple {

    /**
     * does not work, i would need to use stateHelperProvider
     */
    export class SimpleChildState implements ng.ui.IState{
        name = "simple.child";
        url = "/child";
        templateUrl = "App/Simple/SimpleChildView.html";
        controller = "SimpleChildController";
        controllerAs = "controller";
        //resolve on the child transition!
        //- it will call this lambda function to get variable "parentServiceName"
        //- this variable will be injected in the child controller! (nice!)
        resolve = {
            parentServiceName:
            ["SimpleService", (service: App.Simple.ISimpleService) => {
                return service.getServiceName();
            }]
        }
        
    }
}

