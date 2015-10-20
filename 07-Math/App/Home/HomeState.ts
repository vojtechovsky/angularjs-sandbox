module App.Home {
    /**
     * Home state definition
     */
    export class HomeState implements angular.ui.IState {
        name = "home";
        url = "/home";
        controller = "HomeController";
        controllerAs = "controller";
        templateUrl = "App/Home/HomeView.html";
    }
}