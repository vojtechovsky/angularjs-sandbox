module App.Shared.Service {
        //*
        // interface for the simple service
        // - it is not necessary to create an interface 
        // we can create the class without it. 
        // Creating the interface is just a good practice
        //* 
        export interface IMathService {
            getServiceName(): string;
            getOperatorSymbol(operatorType: App.Mathematic.OperatorType): string;
        }

        //*
        // Create a mathematic service
        //*
        export class MathService implements IMathService {

            private _dictionary: {};
            constructor() {
                this._dictionary = {};
                this._dictionary[App.Mathematic.OperatorType.Plus] = "+";
                this._dictionary[App.Mathematic.OperatorType.Minus] = "-";
                this._dictionary[App.Mathematic.OperatorType.Multiplication] = ".";
                this._dictionary[App.Mathematic.OperatorType.Devision] = ":";
            }

            getServiceName(): string {
                return "MathService";
            }

            /**
             * it returns the string interpretation of operator type
             * @param operatorType 
             * @returns {string}  operator sign
             */
            getOperatorSymbol(operatorType: App.Mathematic.OperatorType): string {
                return this._dictionary[operatorType];
            }
        }

        // get the instance of CommonServices module from angular
        var module = angular.module("CommonServices");

        // - register the "MathService" into "CommonServices"
        module.service("mathService", MathService);
    }