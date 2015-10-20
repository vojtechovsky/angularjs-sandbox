module App.Sales {

    /**
     * Sale controller implements manipulation with ISale objects
     * - it uses ngResource as http abstraction
     */
    class SaleController {
        sale: Sale;
        sales: Sale[];

        serviceName:string;
        
        static $inject = ["$state", "SaleService", "SimpleService"];
        constructor(private $state: angular.ui.IStateService, private saleService: App.Sales.ISaleService) {

            this.serviceName =  this.saleService.getServiceName();

            //get new data
            saleService.getMany()
                .then((response: Sale[]) => {
                    this.sales = response;
                });
        }

        /**
         * Remove given object
         * @param sale 
         * @returns {} 
         */
        remove(sale: Sale) {
            this.saleService.remove(sale)
                .success(() => this.$state.reload())
                .error(() => { alert("failure remove"); });
        }
    }

    /**
     * Detail controller for sale entity
     */
    class SaleDetailController {
        
        static $inject = ["$state", "sale", "SaleService"];
        constructor(private $state: ng.ui.IStateService,
            private sale: Sale, private saleService: App.Sales.ISaleService) { }   

        /**
         * Save the entity to the web service
         * @param sale 
         * @returns {} 
         */
        save(sale: Sale) {
            this.saleService.save(sale)
                .success(() => this.$state.go("^.", null, { reload: true }))
                .error(() => { alert("failure save"); });
        }
    }

    //register controller
    let mod = angular.module("dashboardApplication");
    mod.controller("SaleController", SaleController);
    mod.controller("SaleDetailController", SaleDetailController);
}