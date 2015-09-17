module App.ApiaryVideo {
    //*
    // interface for the simple service
    // - it is not necessary to create an interface 
    // we can create the class without it. 
    // Creating the interface is just a good practice
    //* 
    export interface ISimpleService {
        getServiceName() : string;
    }

    //*
    // Create a simple service
    //*
    export class SimpleService implements ISimpleService {
        getServiceName(): string {
            return "SimpleService";
        }
    }

    // get the instance of CommonServices module from angular
    var module = angular.module("CommonServices");

    // - register the "SimpleService" into "CommonServices"
    module.service("SimpleService", SimpleService);
}