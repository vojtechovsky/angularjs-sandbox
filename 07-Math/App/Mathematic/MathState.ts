module App.Mathematic {
    export class R1State implements angular.ui.IState {
        name = "r1";
        url = "/r1";
        controller= "MathController";
        controllerAs= "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            //exercise: () => new App.Mathematic.Exercise()
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Plus)
                .operandRange(0, 5)
                .operandCountRange(5, 6)
                .resultRange(0, 10)
                .taskCount(2)
                .create()
        };
    }

    export class R2State implements angular.ui.IState {
        name = "r2";
        url = "/r2";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            //exercise: () => new App.Mathematic.Exercise()
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Plus)
                .operandRange(0, 20)
                .operandCountRange(5, 6)
                .resultRange(0, 10)
                .taskCount(10)
                .create()
        };
    }

    export class R3State implements angular.ui.IState {
        name = "r3";
        url = "/r3";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            //exercise: () => new App.Mathematic.Exercise()
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(0, 20)
                .operandCountRange(5, 6)
                .resultRange(0, 10)
                .taskCount(10)
                .create()
        };
    }
}