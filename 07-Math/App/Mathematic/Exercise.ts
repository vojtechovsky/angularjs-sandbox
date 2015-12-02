module App.Mathematic {

    /**
     * based class for exercise
     * 
     */
    export class Excercise {

        constructor(
            private _actualOperandTypeArray: OperandType[] = [],
            private _numberCount: number = 2,
            private _taskCount: number = 5) {
            this.isCompleted = false;
            this._tasks = [];
            this.generateTasks();
        }

        private _tasks: Task[];
        private _task: Task;

        public get task():Task {
            return this._task;
        }

        /**
         * private setter for the task
         * @param value 
         * @returns {} 
         */
        private setTask(value: Task) {
            this._task = value;
            this._task.startDate = new Date();
        }

        public get tasks() {
            return this._tasks;
        }


        private _taskActiveIndex = 0;
        public get taskActiveIndex() {
            return this._taskActiveIndex;
        }

        /**
         * it signals the excercise is completed
         */
        public isCompleted: boolean;

        /**
         * generate new _tasks for the repetition
         * @returns {} 
         */
        private generateTasks() {
            //clear the array;
            this._tasks.length = 0;
            //reset active record;
            this._taskActiveIndex = 0;
            this.isCompleted = false;

            for (let i = 0; i < this._taskCount; i++) {
                this._tasks.push(this.createNewRandomTask());
            }
            
            this.setTask(this._tasks[this._taskActiveIndex]);
        }

        /**
         * check given _task.
         * @param _task 
         * @returns {boolean} => return true if the exercise if finished
         */
        public check(task: Task): void {
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

            if ((task.inputResolved) && (this.isLastTask()))
            {
                this.isCompleted = true;
            }
        }

        /**
         * it moves to the next _task in the row
         * or stays at the last
         * 
         * @returns {number} index of the active _task 
         */
        public next(): number {

            this.check(this._task);

            //check the time
            this._task.endDate = new Date();
            this.setDuration(this._task);

            this.isCompleted = this.isLastTask();
            this._task.inputResolved = true;

            if (!this.isCompleted) {
                this.setTask(this._tasks[++this._taskActiveIndex]);
            };
            
            return this._taskActiveIndex;
        }

        /*
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        private getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        /**
         * public only for tests
         * create a new task and return it
         * @returns {} 
         */
        public createNewRandomTask(): Task {
            const num1 = this.getRandomInt(0, 10);
            const num2 = this.getRandomInt(0, 10);
            let res = new Task();
                res.operandSymbol = ["+", "-", ".", "/"];
                res.inputResultType= ResultType.None;
                res.inputTyped= null;
                res.inputResolved= false;
                res.numberOfTrial= 0;
                //startDate= new Date(0);
                //endDate= new Date(0);
                //duration= new Date(0);
                //date= new Date()

                //res.numbers = [num1, num2];
                for (let i = 0; i < this._numberCount; i++) {
                    res.numbers.push(this.getRandomInt(0, 10));
                }

            res.operands = this.getRandomInt(0, 1);

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

        private setDuration(task: Task) {
            task.duration = Math.min(60, Math.floor((task.endDate.valueOf() - task.startDate.valueOf()) / 1000));
            }

        /**
         * 
         * @returns {} 
         */
        isLastTask(): boolean {
            return (this._taskActiveIndex === this._taskCount - 1);
        }
    }
}