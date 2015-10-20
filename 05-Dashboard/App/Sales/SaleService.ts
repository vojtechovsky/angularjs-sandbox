module App.Sales {
    const saleUrl = "http://localhost:61405/api/sales/";
    
    /**
     * Sale interface for Sale service
     */
    export interface ISaleService {

        getServiceName(): string;

        /**
         * Loads the object entity by it's id
         * @param id the id of the entity
         * @returns {IPromise<T>}
         */
        get(id: number): ng.IPromise<Sale>;

        /**
         * Gets entity array
         */
        getMany(): ng.IPromise<Sale[]>;

        /**
         * Deletes the given entity
         * @param Entity to delete
         */
        remove(sale: Sale): ng.IHttpPromise<void>;

        /**
         * Saves a new or the existing entity
         * @param Entity to save
         * @returns {angular.IHttpPromise<T>}
         */
        save(sale: Sale): ng.IHttpPromise<Sale>;
    }

    class SaleService implements ISaleService{

        static $inject = ["$http"];
        constructor(private $http: angular.IHttpService) {
        }

        getServiceName() {
            return "SaleService";
        }

        get(id: number): angular.IPromise<App.Sales.Sale> {
            return this.$http.get<Sale>(`${saleUrl}/${id}`)
                .then(response => Sale.toInstance(response.data));   
        }

        getMany(): angular.IPromise<App.Sales.Sale[]> {
            return this.$http.get(saleUrl)
                .then((response: any) => {
                    const sales: any[] = response.data;
                    return sales.map(Sale.toInstance);
                });
        }

        remove(sale: App.Sales.Sale): angular.IHttpPromise<void> {
            return this.$http.delete<void>(saleUrl + `/${sale.id}`);
        }

        save(sale: App.Sales.Sale): angular.IHttpPromise<App.Sales.Sale> {
            return (sale.id) ?
                this.$http.put(saleUrl, sale) : this.$http.post(saleUrl, sale);
        }
    }
    

    //get CommonServices instance
    let commonService = angular.module("CommonServices");
    //register SaleService under CommonServices
    commonService.service("SaleService", SaleService);
}