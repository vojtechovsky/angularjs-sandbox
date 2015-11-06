module Blocks {
    //*
    // interface for the simple service
    // - it is not necessary to create an interface 
    // we can create the class without it. 
    // Creating the interface is just a good practice
    //* 
    export interface IUserListState {
        getServiceName(): string;
        selectedUser: App.Directive.User;
    }

    //*
    // Create a simple service
    //*
    export class UserListState implements IUserListState {
        getServiceName(): string {
            return "UserListState";
        }

        selectedUser: App.Directive.User;
    }

    // get the instance of CommonServices module from angular
    var module = angular.module("CommonServices");

    // - register the "SimpleService" into "CommonServices"
    module.service("UserListState", UserListState);
}