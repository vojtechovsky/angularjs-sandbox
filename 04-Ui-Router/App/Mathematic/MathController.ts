module App.Mathematic {
    /*
    * Mathematic controller first draft 
    * it controlls the logic with simple one plus one operation
    */
    class MathController {
        task: ITask;
        tasks: ITask[];
        taskActiveId = 0;

        taskCount = 5;
        title = "alive";

        constructor() {
            this.tasks = [];
            this.generateTasks();
        }

        private generateTasks() {
            //clear the array;
            this.tasks.length = 0;
            //reset active record;
            this.taskActiveId = 0;

            for (let i = 0; i < this.taskCount; i++) {
                this.tasks.push(this.createNewRandomTask());
            }

            this.task = this.tasks[this.taskActiveId];
        }

        private resolve(task: ITask) {
            task.inputFeedback = "";

            if (task.inputTyped === task.result) {
                task.inputFeedback = "OK";
                task.inputResolved = true;
                task.inputResultType = (task.numberOfTrial===0)? ResultType.Success : ResultType.Fixed;
            } else {
                task.numberOfTrial = task.numberOfTrial + 1;
                task.inputFeedback = "wrong, try again!";
                task.inputResultType = ResultType.Failure;
                task.inputResolved = (task.numberOfTrial > 1);
            }
        }

        next() {

            if (this.taskActiveId === this.taskCount - 1) {
                alert("well done! task finished");
                this.generateTasks();
                return;
            }

            this.resolve(this.task);

            if (this.task.inputResolved) {
                this.task = this.tasks[++this.taskActiveId];
            }
        }

        clear() {
            this.task.inputTyped = null;
        }

        createNewRandomTask(): ITask {
            const num1 = this.getRandomInt(0, 10);
            const num2 = this.getRandomInt(0, 10);
            const res: ITask = {
                operand: this.getRandomInt(0, 1),
                operandSymbol: ["+", "-", ".", "/"],
                numbers: [num1, num2],
                result: 0,
                inputResult: ResultType.None,
                inputTyped: null,
                inputFeedback: "",
                inputResolved: false,
                numberOfTrial: 0,
                level: 1,
                subLevel: 1,
                duration: new Date(0),
                date: new Date()
            };
            res.result = this.getResult(res.operand, res.numbers);


            return res;
        }

        getResult(operandType: OperandType, numbers: number[]): number {
            switch (operandType) {
            case OperandType.Minus:
            {
                if (numbers[0] - numbers[1] < 0) {
                    const temp = numbers[0];
                    numbers[0] = numbers[1];
                    numbers[1] = temp;
                }
                return numbers[0] - numbers[1];
            }
            case OperandType.Plus:
                return numbers[0] + numbers[1];
            case OperandType.Multiplication:
                return numbers[0] * numbers[1];
            default:
                return numbers[0] % numbers[1];
            }
        }

        /*
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    let module = angular.module("DemoServiceModule");
    module.controller("MathController", MathController);
}