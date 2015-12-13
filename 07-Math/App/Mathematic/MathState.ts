module App.Mathematic {
    export class R1State implements angular.ui.IState {
        name = "r1";
        url = "/r1";
        controller= "MathController";
        controllerAs= "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Plus)
                .operandRange(0, 5)
                .operandCountRange(2, 2)
                .resultRange(0, 10)
                .taskCount(8)
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
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Plus)
                .operandRange(0, 10)
                .operandCountRange(2, 2)
                .resultRange(0, 10)
                .taskCount(8)
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
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(0, 10)
                .operandCountRange(2, 2)
                .resultRange(0, 10)
                .taskCount(8)
                .create()
        };
    }

    export class R4State implements angular.ui.IState {
        name = "r4";
        url = "/r4";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Plus, Mathematic.OperatorType.Minus)
                .operandRange(0, 20)
                .operandCountRange(2, 2)
                .resultRange(0, 20)
                .taskCount(8)
                .create()
        };
    }

    export class R5State implements angular.ui.IState {
        name = "r5";
        url = "/r5";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(1, 30)
                .operandCountRange(2, 2)
                .resultRange(0, 30)
                .taskCount(8)
                .create()
        };
    }

    export class R6State implements angular.ui.IState {
        name = "r6";
        url = "/r6";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(1, 50)
                .operandCountRange(2, 2)
                .resultRange(0, 50)
                .taskCount(8)
                .create()
        };
    }

    export class R7State implements angular.ui.IState {
        name = "r7";
        url = "/r7";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(40, 80)
                .operandCountRange(2, 2)
                .resultRange(40, 80)
                .taskCount(8)
                .create()
        };
    }

    export class R8State implements angular.ui.IState {
        name = "r8";
        url = "/r8";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Plus)
                .operandRange(0, 100)
                .operandCountRange(2, 2)
                .resultRange(0, 100)
                .taskCount(8)
                .create()
        };
    }

    export class R9State implements angular.ui.IState {
        name = "r9";
        url = "/r9";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(0, 100)
                .operandCountRange(2, 2)
                .resultRange(0, 100)
                .taskCount(8)
                .create()
        };
    }

    export class R10State implements angular.ui.IState {
        name = "r10";
        url = "/r10";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(50, 100)
                .operandCountRange(2, 2)
                .resultRange(50, 100)
                .taskCount(8)
                .create()
        };
    }

    export class R11State implements angular.ui.IState {
        name = "r11";
        url = "/r11";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(90, 120)
                .operandCountRange(2, 2)
                .resultRange(90, 120)
                .taskCount(8)
                .create()
        };
    }

    export class R12State implements angular.ui.IState {
        name = "r12";
        url = "/r12";
        controller = "MathController";
        controllerAs = "controller";
        templateUrl = "App/Mathematic/MathView.html";
        resolve = {
            exercise: (): Mathematic.Exercise => Mathematic.ExerciseBuilder
                .operatorType(Mathematic.OperatorType.Minus, Mathematic.OperatorType.Plus)
                .operandRange(0, 200)
                .operandCountRange(2, 2)
                .resultRange(0, 200)
                .taskCount(8)
                .create()
        };
    }
}