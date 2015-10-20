//module App.Sales {

//    const saleUrl = "http://localhost:61405/api/sales/:id";


//    // Define your resource, adding the signature of the custom actions
//    export interface ISaleResource extends ng.resource.IResourceClass<ISale> {
//        update(sale: ISale): ISale;
//    }


//    class SaleResource {

//        //static $inject = ["$resource"];
//        //constructor(private $resource: ng.resource.IResourceService) { }

//        static $inject = ["$resource"];
//        static getSaleResource($resource: ng.resource.IResourceService): ISaleResource {
//            // Define your custom actions here as IActionDescriptor
//            let updateAction: ng.resource.IActionDescriptor = {
//                method: "PUT",
//                isArray: false
//            };

//            // Return the resource, include your custom actions
//            return <ISaleResource> $resource(saleUrl, { id: "@id" }, { update: updateAction });
//        }
//    }
    
//    //get CommonServices instance
//    let commonService = angular.module("CommonServices");
//    //register SaleServiceByResource under CommonServices
//    commonService.factory("SaleResource", SaleResource.getSaleResource);
//}

//http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
//http://stackoverflow.com/questions/21685104/extending-resource-of-angularjs-using-iresourceclass-of-typescript/21786326#21786326