module App.Mathematic {
    /*
    * Mathematic controller first draft 
    * it controlls the logic with simple one plus one operation
    */
    export class MathController {
        public title = "alive";
        private excercise: Excercise;

        get task() {
            return this.excercise.Task;
        }


        public get IsCompleted() {
            return this.excercise.IsCompleted;
        }

        constructor() {
            this.excercise = new Excercise(3);
        }

    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("MathController", MathController);
}