module App.Sales {

    const saleUrl = "http://localhost:61405/api/sales/:id";

    interface ISale {
        id: number;
        name: string;
        category: string;
        volume: number;
        chance: number;
        difference: number;
    }

    /**
     * extend IResource interface of ISale interface
     */
    export interface IResourceSale extends ng.resource.IResource<ISale> {
        
    }

    /**
     * define interface for the service
     * - it must return IResourceClass of generic IResourceSale so we can manipulate with the ISale objects
     */
    export interface ISaleServiceByResource {
        getSaleResourceClass(paramDefaults?: any, actions?: any): ng.resource.IResourceClass<IResourceSale>;
    }

    /**
     * concrete implementation of the ISaleServiceByResource
     */
    class SaleServiceByResource implements ISaleServiceByResource {

        static $inject = ["$resource"];
        constructor(private $resource: ng.resource.IResourceService) {
            
        }
        /**
         * get resource class of generic ISale
         * @returns {} 
         */
        getSaleResourceClass(paramDefaults?: any, actions?: any): angular.resource.IResourceClass<IResourceSale> {
            return this.$resource(saleUrl, paramDefaults, actions);

            //paramDefaults ?: any,
            ///** example:  {update: { method: 'PUT' }, delete: deleteDescriptor }
            // where deleteDescriptor : IActionDescriptor */
            //actions ?: any,
            //var employees = $resource('/api/employee/:id', { id: '@id' }, { "update": { method: "PUT", isArray: false } };

        }
    }

    //get CommonServices instance
    let commonService = angular.module("CommonServices");
    //register SaleServiceByResource under CommonServices
    commonService.service("SaleServiceByResource", SaleServiceByResource);
}