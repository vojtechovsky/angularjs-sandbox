module App.Common {
   export interface IDataAccessService {
		getProductResource(): ng.resource.IResourceClass<IPersonResource>;
	}

    export interface IPersonResource
		extends ng.resource.IResource<App.Simple.IPerson> {

	}

	export class DataAccessService
		implements IDataAccessService {

		static $inject = ["$resource"];
		constructor(private $resource: ng.resource.IResourceService) {

		}

		getProductResource(): ng.resource.IResourceClass<IPersonResource> {
			return this.$resource("/api/persons/:personId");
		}
    }

	angular
        .module("CommonServices")
        .service("dataAccessService", DataAccessService);

}