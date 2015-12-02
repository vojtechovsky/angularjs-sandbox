module App.Mathematic {

    export enum ResultType {
        None = 0,
        Success = 1,
        Fixed = 2,
        Failure = 3,
    }

    export class Task {
        operands: OperandType[];
        operandSymbol: string[];
        numbers: number[];
        result: number;
        inputResultType: ResultType;
        inputTyped: number;
        inputFeedback: string;
        inputResolved : boolean;
        numberOfTrial: number;
        level: number;
        subLevel : number;
        duration: number;
        startDate: Date;
        endDate: Date;
        date: Date;
    }
}