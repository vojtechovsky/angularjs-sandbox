module App.HumanResource {

    const humanResourceUrl = "http://localhost:61405/api/humanResource/";
    
    /**
     * HumanResource interface for HumanResource service
     */
    export interface IHumanResourceService {

        getServiceName(): string;

        /**
         * Loads the object entity by it's id
         * @param id the id of the entity
         * @returns {IPromise<T>}
         */
        get(id: number): ng.IPromise<HumanResourceReportData>;

        /**
         * Gets entity array
         */
        getMany(): ng.IPromise<HumanResourceReportData[]>;

        /**
         * Deletes the given entity
         * @param Entity to delete
         */
        remove(humanResource: HumanResourceReportData): ng.IHttpPromise<void>;

        /**
         * Saves a new or the existing entity
         * @param Entity to save
         * @returns {angular.IHttpPromise<T>}
         */
        save(humanResource: HumanResourceReportData): ng.IHttpPromise<HumanResourceReportData>;

    }

    class HumanResourceService implements IHumanResourceService{

        static $inject = ["$http"];
        constructor(private $http: angular.IHttpService) {
        }

        getServiceName() {
            return "HumanResourceService";
        }

        get(id: number): angular.IPromise<HumanResourceReportData> {
            return this.$http.get<HumanResourceReportData>(`${humanResourceUrl}/${id}`)
                .then(response => this.toInstance(response.data));   
        }

        getMany(): angular.IPromise<HumanResourceReportData[]> {
            return this.$http.get(humanResourceUrl)
                .then((response: any) => {
                    const humanResources: any[] = response.data;
                    return humanResources.map(this.toInstance);
                });
        }

        remove(humanResource: HumanResourceReportData): angular.IHttpPromise<void> {
            return this.$http.delete<void>(humanResourceUrl + `/${humanResource.id}`);
        }

        save(humanResource: HumanResourceReportData): angular.IHttpPromise<HumanResourceReportData> {
            return (humanResource.id) ?
                this.$http.put(humanResourceUrl, humanResource) : this.$http.post(humanResourceUrl, humanResource);
        }

        private toInstance(response: any): HumanResourceReportData {
            let humanResourceReportData = new HumanResourceReportData();
            humanResourceReportData.parse(response);
            return humanResourceReportData;
        }

    }
    

    //get CommonServices instance
    let commonService = angular.module("CommonServices");
    //register HumanResourceService under CommonServices
    commonService.service("HumanResourceService", HumanResourceService);
}