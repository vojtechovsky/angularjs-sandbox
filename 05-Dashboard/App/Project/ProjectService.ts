module App.Project {
    const projectUrl = "http://localhost:61405/api/project/";
    
    /**
     * Project interface for Project service
     */
    export interface IProjectService {

        getServiceName(): string;

        /**
         * Loads the object entity by it's id
         * @param id the id of the entity
         * @returns {IPromise<T>}
         */
        get(id: number): ng.IPromise<ProjectReportData>;

        /**
         * Gets entity array
         */
        getMany(): ng.IPromise<ProjectReportData[]>;

        /**
         * Deletes the given entity
         * @param Entity to delete
         */
        remove(project: ProjectReportData): ng.IHttpPromise<void>;

        /**
         * Saves a new or the existing entity
         * @param Entity to save
         * @returns {angular.IHttpPromise<T>}
         */
        save(project: ProjectReportData): ng.IHttpPromise<ProjectReportData>;

    }

    class ProjectService implements IProjectService{

        static $inject = ["$http"];
        constructor(private $http: angular.IHttpService) {
        }

        getServiceName() {
            return "ProjectService";
        }

        get(id: number): angular.IPromise<ProjectReportData> {
            return this.$http.get<ProjectReportData>(`${projectUrl}/${id}`)
                .then(response => this.toInstance(response.data));   
        }

        getMany(): angular.IPromise<ProjectReportData[]> {
            return this.$http.get(projectUrl)
                .then((response: any) => {
                    const projects: any[] = response.data;
                    return projects.map(this.toInstance);
                });
        }

        remove(project: ProjectReportData): angular.IHttpPromise<void> {
            return this.$http.delete<void>(projectUrl + `/${project.id}`);
        }

        save(project: ProjectReportData): angular.IHttpPromise<ProjectReportData> {
            return (project.id) ?
                this.$http.put(projectUrl, project) : this.$http.post(projectUrl, project);
        }

        private toInstance(response: any): ProjectReportData {
            let projectReportData = new ProjectReportData();
            projectReportData.parse(response);
            return projectReportData;
        }

    }
    

    //get CommonServices instance
    let commonService = angular.module("CommonServices");
    //register ProjectService under CommonServices
    commonService.service("ProjectService", ProjectService);
}