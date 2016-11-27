module App.Chat {

    export class ChatController {
        public title = "ChatController is alive!";
        public messages: string[];
        

        static $inject = ["signalRService"];
        constructor(private signalRService: App.Shared.Service.SignalRService) {

        }

        public sendMessage(): string {
            this.signalRService.server.sendMessage();

        }


        public addMessage(message) {

            this.messages.push(message);
        }
    }

    //get the application instance
    var module = angular.module("AppSignalR");

    //register a new controller
    module.controller("ChatController", ChatController);
}