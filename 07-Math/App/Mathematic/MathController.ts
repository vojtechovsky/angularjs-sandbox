﻿module App.Mathematic {
    /*
    * Mathematic controller first draft 
    * it controlls the logic with simple one plus one operation
    */
    export class MathController {
        public title = "alive";
        public message: string;

        private tasks: Task[];

        private task: Task;
        get Task() {
            return this.task;
        }

        private taskActiveIndex = 0;
        get TaskActiveIndex() {
            return this.taskActiveIndex;
        }

        private taskCount = 3;
        public get TaskCount() {
            return this.taskCount;
        } 

        private isCompleted: boolean;
        public get IsCompleted() {
            return this.isCompleted;
        }

        constructor() {
            this.isCompleted=false;
            this.tasks = [];
            this.generateTasks();
        }

        /**
         * generate new tasks for the repetition
         * @returns {} 
         */
        private generateTasks() {
            //clear the array;
            this.tasks.length = 0;
            //reset active record;
            this.taskActiveIndex = 0;
            this.isCompleted = false;

            for (let i = 0; i < this.taskCount; i++) {
                this.tasks.push(this.createNewRandomTask());
            }

            this.task = this.tasks[this.taskActiveIndex];
        }


/**
         * resolve given task.
         * @param task 
         * @returns {} 
         */
        resolve(task: Task): void {
            task.inputFeedback = "";

            if (task.inputTyped === task.result) {
                task.inputFeedback = "OK";
                task.inputResolved = true;
                task.inputResultType = (task.numberOfTrial === 0) ? ResultType.Success : ResultType.Fixed;
            } else {
                task.numberOfTrial = task.numberOfTrial + 1;
                task.inputFeedback = "wrong, try again!";
                task.inputResultType = ResultType.Failure;
                task.inputResolved = (task.numberOfTrial > 1);
            }
        }

        /**
         * 
         * @returns {} 
         */
        public next(): number {
            this.message = "";

            this.resolve(this.task);

            if (this.taskActiveIndex === this.taskCount - 1) {
                //this.message = "well done! task finished";
                //this.generateTasks();

                this.isCompleted = this.task.inputResolved;
                return this.taskActiveIndex;
            }
           

            if (this.task.inputResolved) {
                this.task = this.tasks[++this.taskActiveIndex];
            }

            return this.taskActiveIndex;
        }

        /**
         * clear inputTyped field
         * @returns {} 
         */
        private clear(): void {
            this.task.inputTyped = null;
        }

        /*
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        private getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        /**
         * create a new task and return it
         * @returns {} 
         */
        public createNewRandomTask(): Task {
            const num1 = this.getRandomInt(0, 10);
            const num2 = this.getRandomInt(0, 10);
            const res: Task = {
                operand: this.getRandomInt(0, 1),
                operandSymbol: ["+", "-", ".", "/"],
                numbers: [num1, num2],
                result: 0,
                inputResultType: ResultType.None,
                inputTyped: null,
                inputFeedback: "",
                inputResolved: false,
                numberOfTrial: 0,
                level: 1,
                subLevel: 1,
                duration: new Date(0),
                date: new Date()
            };

            //check minus operator and swap if the result is negative
            if ((res.operand === 1) && (num2 > num1)) {
                res.numbers = [num2, num1];
            }

            res.result = this.getResult(res.operand, res.numbers);
            return res;
        }

        /**
         * calculate given mathematic operation
         * @param operandType 
         * @param numbers 
         * @returns {} 
         */
        public getResult(operandType: OperandType, numbers: number[]): number {
            switch (operandType) {
            case OperandType.Minus:
                return numbers[0] - numbers[1];
            case OperandType.Plus:
                return numbers[0] + numbers[1];
            case OperandType.Multiplication:
                return numbers[0] * numbers[1];
            default:
                return numbers[0] % numbers[1];
            }
        }


    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("MathController", MathController);
}