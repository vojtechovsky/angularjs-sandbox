module App.Shared.Service {
    //*
    // interface for the simple service
    // - it is not necessary to create an interface 
    // we can create the class without it. 
    // Creating the interface is just a good practice
    //* 
    //export interface IMathService {
    //    getServiceName(): string;
    //    getOperatorSymbol(operatorType: App.Mathematic.OperatorType): string;
    //}

    export class SignalRService {

        private proxy: SignalR.Hub.Proxy;

        static $inject: Array<string> = ['$', '$rootScope'];
        constructor(private $: JQueryStatic, $rootScope: ng.IRootScopeService) {

            // creates a new hub connection
            var connection = $.hubConnection("/signalr", { useDefaultPath: false });

            // enabled logging to see in browser dev tools what SignalR is doing behind the scenes
            connection.logging = true;

            // create a proxy
            this.proxy = connection.createHubProxy('chatHub');
            this.proxy.connection.logging = true;

            // start connection
            connection.start();

            // publish an event when server pushes a newCounters message for client
            this.proxy.on('newCounters', results => {
                $rootScope.$emit('newCounters', results);
            });

            
        }

        
    }


    // get the instance of app module
    var module = angular.module("AppSignalR");

    // - register the "SignalRService" into "services"
    module.service("signalRService", SignalRService);
}