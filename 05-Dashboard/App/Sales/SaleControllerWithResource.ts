module App.Sales {

    interface ISale {
        id: number;
        name: string;
        category: string;
        volume: number;
        chance: number;
        difference: number;
    }
    /**
     * Sale controller implements manipulation with ISale objects
     * - it uses ngResource as http abstraction
     */
    class SaleControllerWithResource {
        sale: ISale;
        sales: ISale[];
        resourceClass: ng.resource.IResourceClass<App.Sales.IResourceSale>;

        static $inject = ["$state", "$filter", "SaleServiceByResource"];
        constructor(private $state: angular.ui.IStateService, private $filter: angular.IFilterService,
            private saleService: App.Sales.ISaleServiceByResource) {
            //this.sales = this.getMockDataSource();
            
            this.resourceClass = saleService.getSaleResourceClass();

            //get new data
            this.resourceClass.query((data: ISale[]) => {
                    this.sales = data;
                });
            
        }

        /**
         * Remove given object
         * @param sale 
         * @returns {} 
         */
        remove(sale: ISale) {
            this.resourceClass.remove({ id: sale.id}, sale,
                () => this.$state.reload(),
                () => { alert("failure remove"); });
        }

        /**
         * from given id parameter gets the object to edit
         * @param id 
         * @returns {} 
         */
        //edit(idValue?: number):ISale {

        //    let found = this.$filter("filter")(this.sales, { id: idValue }, true);

        //    if (found != null) {
        //        return found[0];
        //    } else {
        //        return {
        //            id:0,
        //            name: "new name",
        //            category: "",
        //            volume:0,
        //            chance: 0,
        //            difference:0
        //        };
        //    }
        //}


        /**
         * not in used, just for the first draft to hard-coded
         * @returns {} 
         */
        //getMockDataSource(): ISale[] {

        //    return [
        //        { id: 1, name: "Berner KB", category: "Risikoprofilierung", volume: 200000, chance: 75, difference: 25 },
        //        { id: 2, name: "Glarner KB", category: "Risikoprofilierung And Anlageberatung", volume: 180000, chance: 50, difference: -20 },
        //        { id: 3, name: "Notenstein Privatbank", category: "Risikoprofilierung", volume: 250000, chance: 75, difference: 0 },
        //        { id: 4, name: "Tareno", category: "Risikoprofilierung", volume: 160000, chance: 25, difference: 0 },
        //        { id: 5, name: "Bank SoBa", category: "Document Management", volume: 40000, chance: 25, difference: 0.0 }
        //    ];
        //}
    }

    /**
     * Detail controller for sale entity
     */
    class SaleDetailControllerWithResource {
        resourceClass: ng.resource.IResourceClass<App.Sales.IResourceSale>;

        
        static $inject = ["$state", "sale", "SaleServiceByResource"];
        constructor(private $state: angular.ui.IStateService,private sale: ISale, private saleService: App.Sales.ISaleServiceByResource) {
            this.resourceClass = saleService.getSaleResourceClass();
        }   

        /**
         * Save the entity to the web service
         * @param sale 
         * @returns {} 
         */
        save(sale: ISale) {
        
            this.resourceClass.save(sale,
                () => this.$state.go("^.", null, { reload: true }),
                () => { alert("failure save"); });

            // Get specific employee, and change their last name
//            let newSale: ISale = this.saleResource.get({ id: 123 });
            // Custom action
            //this.saleResource.update(sale);
                //return
                //var employees = $resource('/api/employee/:id', { id: '@id' }, { "update": { method: "PUT", isArray: false } };
                //let r = this.saleService.getSaleResourceClass(null, { "update": { method: "PUT", isArray: false } });
                //r.save(sale,
                //    () => this.$state.go("^.", null, { reload: true }),
                //    () => { alert("failure save"); });
                //return;
            
            
       }
    }

    //register controller
    let mod = angular.module("dashboardApplication");
    mod.controller("SaleControllerWithResource", SaleControllerWithResource);
    mod.controller("SaleDetailControllerWithResource", SaleDetailControllerWithResource);
}