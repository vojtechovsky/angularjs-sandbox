module App.Mathematic {
    export class MathState implements angular.ui.IState {
        name = "mathematic";
        url = "/mathematic";
        controller= "MathController";
        controllerAs= "controller";
        templateUrl= "App/Mathematic/MathView.html";
    }
}