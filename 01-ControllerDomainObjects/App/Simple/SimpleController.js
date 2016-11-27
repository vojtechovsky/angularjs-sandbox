var App;
(function (App) {
    var Simple;
    (function (Simple) {
        var SimpleController = (function () {
            function SimpleController() {
                this.title = "Simple Controller";
            }
            return SimpleController;
        }());
        //angular please give me back the instance of the module
        // and register a new controller object
        angular.module("SimpleModule")
            .controller("SimpleController", SimpleController);
    })(Simple = App.Simple || (App.Simple = {}));
})(App || (App = {}));
//# sourceMappingURL=SimpleController.js.map