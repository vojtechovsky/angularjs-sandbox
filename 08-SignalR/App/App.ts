//create application module
module App {
    var app = angular.module("AppSignalR", []);

    app.value("backendServerUrl", "http://localhost:53411/");
}