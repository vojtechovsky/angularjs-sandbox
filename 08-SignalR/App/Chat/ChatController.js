var App;
(function (App) {
    var Chat;
    (function (Chat) {
        var ChatController = (function () {
            function ChatController(signalRService) {
                this.signalRService = signalRService;
                this.title = "ChatController is alive!";
            }
            ChatController.prototype.sendMessage = function () {
                this.signalRService.server.sendMessage();
            };
            ChatController.prototype.addMessage = function (message) {
                this.messages.push(message);
            };
            ChatController.$inject = ["signalRService"];
            return ChatController;
        }());
        Chat.ChatController = ChatController;
        //get the application instance
        var module = angular.module("AppSignalR");
        //register a new controller
        module.controller("ChatController", ChatController);
    })(Chat = App.Chat || (App.Chat = {}));
})(App || (App = {}));
