module App.GitHub {

    //* 
    // GitHub Controller has 3 properties:
    // - Title
    // - UserName
    // - [injected] service
    //
    // service must be defined as static in order to get properly minimized(javascript)
    class GitHubController {
        User: IUser;
        Title: string;
        UserName: string;

        static $inject = ["GitHubService"];
        constructor(private service: App.GitHub.GitHubService) {
            this.Title = "GitHubController gets live web feed from api.github.com";
            this.UserName = "robconery";

        }

        //*
        // Search method takes the service and ask for IUser
        // 
        Search(): void {
            var resource = this.service.getGitHubUser(this.UserName);
            resource.get((data: App.GitHub.IUser) => {
                this.User = data;
            });
        }

     
    }
    //registration of the controller
    // give me module "DemoServiceModule"
    var module = angular.module("DemoServiceModule");

    //register new controller "GitHubController" into module "DemoServiceModule"
    module.controller("GitHubController", GitHubController);

}