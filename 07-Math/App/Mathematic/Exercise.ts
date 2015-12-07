module App.Mathematic {

    /**
     * based class for exercise
     * 
     */
    export class Exercise {

        constructor(
            private _operatorTypes: App.Mathematic.OperatorType[] = [OperatorType.Plus, OperatorType.Minus],
            private _operandMin: number = 0,
            private _operandMax: number = 10,
            private _operandsCountMin: number = 2,
            private _operandsCountMax: number = 2,
            private _taskCount: number = 5,
            private _resultMin: number = 0,
            private _resultMax: number = 10) {
            this.isCompleted = false;
            this.tasks = [];
            this.generateTasks();
        }


        public tasks: Task[];
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

        private _taskActiveIndex = 0;
        public get taskActiveIndex() {
            return this._taskActiveIndex;
        }

        /**
         * it signals the exercise is completed
         */
        public isCompleted: boolean;

        /**
         * generate new tasks for the repetition
         * @returns {} 
         */
        private generateTasks() {
            //clear the array;
            this.tasks.length = 0;

            //reset active record;
            this._taskActiveIndex = 0;
            this.isCompleted = false;

            for (let i = 0; i < this._taskCount; i++) {
                this.tasks.push(this.createNewRandomTask());
            }
            
            this.setTask(this.tasks[this._taskActiveIndex]);
        }

        /**
         * public only for tests
         * create a new task and return it
         * @returns {} 
         */
        public createNewRandomTask(): Task {
            let res = new Task();
            res.operands = [];
            //res.operatorSymbols = ["+", "-", ".", "/"];
            res.operatorTypes = [];
            res.inputResultType = ResultType.None;
            res.inputTyped = null;
            res.inputResolved = false;
            res.numberOfTrial = 0;
            //startDate= new Date(0);
            //endDate= new Date(0);
            //duration= new Date(0);
            //date= new Date()

            let operandsCount = _.random(this._operandsCountMin, this._operandsCountMax);
            for (let i = 0; i < operandsCount; i++) {
                res.operands.push(_.random(this._operandMin, this._operandMax));
                res.operatorTypes.push(this._operatorTypes[_.random(this._operatorTypes.length - 1)]);
            }
          
            //check minus operator and swap if the result is negative
            if ((res.operatorTypes[0] === 1) && (res.operands[1] > res.operands[0])) {
                let num1 = res.operands[0];
                res.operands[0] = res.operands[1];
                res.operands[1] = num1;
            }

            res.result = this.getResult(res.operatorTypes[0], res.operands);
            return res;
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
                this.setTask(this.tasks[++this._taskActiveIndex]);
            };
            
            return this._taskActiveIndex;
        }

        /*
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        //private getRandomInt(min, max) {
        //    return Math.floor(Math.random() * (max - min + 1)) + min;
        //}

        /**
         * calculate given mathematic operation
         * @param operandType 
         * @param operands 
         * @returns {} 
         */
        public getResult(operandType: App.Mathematic.OperatorType, numbers: number[]): number {
            switch (operandType) {
                case App.Mathematic.OperatorType.Minus:
                    return numbers[0] - numbers[1];
                case App.Mathematic.OperatorType.Plus:
                    return numbers[0] + numbers[1];
                case App.Mathematic.OperatorType.Multiplication:
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