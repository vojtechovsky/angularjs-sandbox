//create application module
var App;
(function (App) {
    var app = angular.module("AppSignalR", []);
    app.value("backendServerUrl", "http://localhost:53411/");
})(App || (App = {}));
