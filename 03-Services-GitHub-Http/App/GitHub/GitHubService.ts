module App.GitHub {
   // constant api URL
    const  API_URL = "https://api.github.com/users/:userName";

    // EXTEND the interface IResource: since we wants to return generic IUser
    export interface IResourceUser extends ng.resource.IResource<App.GitHub.IUser> {

    }

    // Define your resource, adding the signature of the custom actions
    export interface IGitHubService {

        //get the github user from the api
        getGitHubUser(userName: string): ng.resource.IResourceClass<IResourceUser>;
	}
    
    // -------------------
    // - Service to export
    //-------------------- 
	export class GitHubService implements IGitHubService {

		static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {
		}

        getGitHubUser(userName: string): ng.resource.IResourceClass<IResourceUser> {

            return this.$resource(API_URL, { userName: userName });
        }
    }

    //please give as a module called "CommonServices"
    let csModule = angular.module("CommonServices");
    
    //register a new service "GitHubService" into module "CommonServices"
    csModule.service("GitHubService", GitHubService);
}