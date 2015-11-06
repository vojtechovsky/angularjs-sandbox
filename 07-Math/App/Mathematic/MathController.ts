module App.Mathematic {
    /*
    * Mathematic controller first draft 
    * it controlls the logic with simple one plus one operation
    */
    export class MathController {
        public Title = "alive";
        public Excercise: Excercise;
        
        public get Task() {
            return this.Excercise.Task;
        }


        /**
         * clear inputTyped field on the current task
         */            
        private clear(): void {
            this.Task.inputTyped = null;
        }

        constructor() {
            this.Excercise = new Excercise(3);
        }

    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("MathController", MathController);
}