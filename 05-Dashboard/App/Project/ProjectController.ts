module App.Finance {

    class ProjectController {

        scope: any;

        static $inject = ["$scope", "DevexpressService", "projectReportData"];
        constructor(private $scope: ng.IScope, private service: App.Common.IDevexpressService,
            private projectReportData: App.Project.ProjectReportData) {

            //assign the scope
            this.scope = $scope;
            
            //this.scope.gaugeCustomerProject = customerProjectOptions;
            this.scope.gaugeCustomerProject = service.getCircularGaugeOptions(this.projectReportData.customerProject);

            //this.scope.gaugeResearchAndDevelopment = researchAndDevelopmentOptions;
            this.scope.gaugeResearchAndDevelopment = service.getCircularGaugeOptions(this.projectReportData.researchAndDevelopment);

            //this.scope.gaugeEducation = educationOptions;
            this.scope.gaugeEducation = service.getCircularGaugeOptions(this.projectReportData.education);
        }
    }

    let mod = angular.module("dashboardApplication");
    mod.controller("ProjectController", ProjectController);
}