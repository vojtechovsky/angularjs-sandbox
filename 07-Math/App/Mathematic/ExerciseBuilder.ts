module App.Mathematic {
    export class ExerciseCommand {
        private _operandMin: number = 0;
        private _operandMax: number = 10;
        private _operandsCountMin: number = 2;
        private _operandsCountMax: number = 2;
        private _resultMin: number = 0;
        private _resultMax: number = 10;
        private _tasksCount: number = 10;

        constructor(private _types: App.Mathematic.OperatorType[]) {
        }

        static getName(): string {
            return "title";
        }

        operandCountRange(min: number, max: number): ExerciseCommand {
            this._operandsCountMin = min;
            this._operandsCountMax = max;
            return this;
        }


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
            this._tasksCount = testCount;
            return this;
        }

        create(): App.Mathematic.Exercise {
            return new App.Mathematic.Exercise(
                this._types, this._operandMin, this._operandMax,
                this._operandsCountMin, this._operandsCountMax,
                this._tasksCount,
                this._resultMin, this._resultMax);
        }
    }

    export class ExerciseBuilder {
        static operatorType(...types: App.Mathematic.OperatorType[]): ExerciseCommand {
            return new ExerciseCommand(types);
        }
    }
}