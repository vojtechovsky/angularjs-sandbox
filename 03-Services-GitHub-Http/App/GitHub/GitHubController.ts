module App.GitHub {

    
    class GitHubController {
        User: IUser;
        Title: string;
        UserName: string;

        static $inject = ["GitHubService"];
        constructor(private service: App.Common.GitHubService) {
            this.Title = "03 is alive";
            this.UserName ="robconery"

        }
        Search(): void {
            var resource = this.service.getGitHubUser(this.UserName);
            resource.get((data: App.GitHub.IUser) => {
                this.User = data;
            });
        }

     
    }

    //register the controller
    angular.module("GitHubModule")
        .controller("GitHubController", GitHubController)
}