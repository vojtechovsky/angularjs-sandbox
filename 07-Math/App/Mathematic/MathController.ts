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

        /**
         * allow to controll the task flow.
         * first try to check the task if we keep wrong result disable the control and call next
         * @param task 
         * @returns {} 
         */
        private next(task: Task) {
            if (task.inputResolved) {
                this.Excercise.next();
            } else {
                this.Excercise.check(task);
            }
        }

        constructor() {
            this.Excercise = new Excercise(2,[OperandType.Plus], 12);
        }

    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("MathController", MathController);
}