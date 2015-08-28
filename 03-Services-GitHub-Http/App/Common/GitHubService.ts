module App.Common {

    // Define an interface of the object you want to use, providing it's properties
    interface IUser extends ng.resource.IResource<App.GitHub.IUser> {

    }

    // Define your resource, adding the signature of the custom actions
    interface IUserResource {

        //get the github user from the api
        getGitHubUser(userName: string): ng.resource.IResourceClass<IUser>;
	}

    
    // -------------------
    // - Service to export
    //-------------------- 
	export class GitHubService implements IUserResource {

		static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {

		}

        getGitHubUser(userName: string): ng.resource.IResourceClass<IUser> {
            return this.$resource("https://api.github.com/users/:userName", { userName: userName });
		}
    }

	angular
        .module("CommonServices")
        .service("GitHubService", GitHubService);
}