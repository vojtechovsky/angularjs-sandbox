module App.Finance {
    const financeUrl = "http://localhost:61405/api/finance/";
    
    /**
     * Finance interface for Finance service
     */
    export interface IFinanceService {

        getServiceName(): string;

        /**
         * Loads the object entity by it's id
         * @param id the id of the entity
         * @returns {IPromise<T>}
         */
        get(id: number): ng.IPromise<FinanceReportData>;

        /**
         * Gets entity array
         */
        getMany(): ng.IPromise<FinanceReportData[]>;

        /**
         * Deletes the given entity
         * @param Entity to delete
         */
        remove(finance: FinanceReportData): ng.IHttpPromise<void>;

        /**
         * Saves a new or the existing entity
         * @param Entity to save
         * @returns {angular.IHttpPromise<T>}
         */
        save(finance: FinanceReportData): ng.IHttpPromise<FinanceReportData>;

    }

    class FinanceService implements IFinanceService{

        static $inject = ["$http"];
        constructor(private $http: angular.IHttpService) {
        }

        getServiceName() {
            return "FinanceService";
        }

        get(id: number): angular.IPromise<FinanceReportData> {
            return this.$http.get<FinanceReportData>(`${financeUrl}/${id}`)
                .then(response => this.toInstance(response.data));   
        }

        getMany(): angular.IPromise<FinanceReportData[]> {
            return this.$http.get(financeUrl)
                .then((response: any) => {
                    const Finances: any[] = response.data;
                    return Finances.map(this.toInstance);
                });
        }

        remove(finance: FinanceReportData): angular.IHttpPromise<void> {
            return this.$http.delete<void>(financeUrl + `/${finance.id}`);
        }

        save(finance: FinanceReportData): angular.IHttpPromise<FinanceReportData> {
            return (finance.id) ?
                this.$http.put(financeUrl, finance) : this.$http.post(financeUrl, finance);
        }

        private toInstance(response: any): FinanceReportData {
            let financeReportData = new FinanceReportData();
            financeReportData.parse(response);
            return financeReportData;
        }

    }
    

    //get CommonServices instance
    let commonService = angular.module("CommonServices");
    //register FinanceService under CommonServices
    commonService.service("FinanceService", FinanceService);
}