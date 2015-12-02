module App.Mathematic {
    export class ExerciseCommand {
        private _operandMin: number = 0;
        private _operandMax: number = 10;
        private _resultMin: number = 0;
        private _resultMax: number = 10;
        private _testCount: number = 10;

        operandRange(min: number, max: number): ExerciseCommand {
            this._operandMin = min;
            this._operandMax = max;
            return this;
        }

        resultRange(min: number, max: number): ExerciseCommand {
            this._resultMin = min;
            this._resultMax = max;
            return this;
        }

        taskCount(testCount: number): ExerciseCommand {
            this._testCount = testCount;
            return this;
        }

        create(): Excercise {
            return new Excercise();
        }
        
    }

    export class ExerciseBuilder {
        static operatorType(...types: App.Mathematic.OperatorType[]): ExerciseCommand {
            return new ExerciseCommand();
        }
    }
}