module App.Person {

    //web api url
    const SERVICE_URL = "http://localhost:61405/api/:controller/:action/:id";

    export interface IPersonResource extends ng.resource.IResource<IPerson> {
        }

    export interface IPersonService {
        getPersonResourceClass() : ng.resource.IResourceClass<IPersonResource>;
    }

    export class PersonService implements IPersonService{
        paramDefaults: Object = {
            controller: "Person"
        };

        static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {
        }

        getPersonResourceClass(): angular.resource.IResourceClass<IPersonResource> {
            return this.$resource(SERVICE_URL, this.paramDefaults);
        }
    }

    let module = angular.module("CommonServices");
    module.service("PersonService", PersonService);
}