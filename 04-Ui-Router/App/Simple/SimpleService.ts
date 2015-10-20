module App.Simple {
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
    // using "let" is preferable in typescript.
    // "var" is accessable before the instance is created so it is bad practice
    let module = angular.module("CommonServices");

    // - register the "SimpleService" into "CommonServices"
    module.service("SimpleService", SimpleService);
}