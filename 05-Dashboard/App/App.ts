module App {

    class Configuration {

        static $inject = ["$stateProvider"];
        constructor(private stateProvider: angular.ui.IStateProvider) {
            this.init();
        }

        private init(): void {

            // we can either create each instance separate and then add it into 
            //stateProvider or all at once
            let simpleState: ng.ui.IState =
            {
                name: "simple",
                url: "/simple",
                controller: "SimpleController",
                controllerAs: "controller",
                templateUrl: "App/Simple/SimpleView.html",
            };

            //this is a direct object or we can use SimpleChildState object
            let simpleChild: ng.ui.IState =
            {
                name: "simple.child",
                url: "/child",
                templateUrl: "App/Simple/SimpleChildView.html",
                controller: "SimpleChildController",
                controllerAs: "controller",
                //resolve on the child transition!
                //- it will call this lambda function to get variable "parentServiceName"
                //- this variable will be injected in the child controller! (nice!)
                resolve: {
                    parentServiceName: ["SimpleService", (service: App.Simple.ISimpleService) => {return service.getServiceName()}]
                }
        };

            this.stateProvider.state(simpleState);
            this.stateProvider.state(simpleChild);
            //-> direct object: this.stateProvider.state(simpleChild);
            //-> instatiate by new object
            //this.stateProvider.state(new App.Simple.SimpleChildState());


            //all at once
            this.stateProvider
                .state("finance", <ng.ui.IState>
                {
                    url: "/finance",
                    controller: "FinanceController",
                    controllerAs: "controller",
                    templateUrl: "App/Finance/FinanceView.html",
                    resolve: {
                        financeReportData:
                        [
                            "$stateParams", "FinanceService", "$q",
                            ($stateParams: ng.ui.IStateParamsService, financeService: App.Finance.IFinanceService, $q: ng.IQService):
                            ng.IPromise<App.Finance.FinanceReportData> => {
                                return financeService.get(1);
                            }]
                    }
                })
                .state("project", <ng.ui.IState>
                    {
                        url: "/project",
                        controller: "ProjectController",
                        controllerAs: "pCtrl",
                        templateUrl: "App/Project/ProjectView.html",
                        resolve: {
                            projectReportData:
                            [
                                "$stateParams", "ProjectService", "$q",
                                ($stateParams: ng.ui.IStateParamsService, projectService: App.Project.IProjectService, $q: ng.IQService):
                                    ng.IPromise<App.Project.ProjectReportData> => {
                                    return projectService.get(1);
                                }]
                        }
                    })
                .state("sale", <ng.ui.IState>
                    {
                        url: "/sale",
                        controller: "SaleController",
                        controllerAs: "sCtrl",
                        templateUrl: "App/Sales/SaleView.list.html"
                })
                //child
                .state("sale.edit", <ng.ui.IState>
                    {
                        url: "/edit/{id:int}",
                        params: { id: <number>null },
                        templateUrl: "App/Sales/SaleView.edit.html",
                        controller: "SaleDetailController",
                        controllerAs: "vm",
                        resolve: {
                            sale:
                            ["$stateParams", "SaleService", "$q",
                             ($stateParams: ng.ui.IStateParamsService, saleService: App.Sales.ISaleService, $q: ng.IQService):
                                    ng.IPromise<App.Sales.Sale> => {
                                    if ($stateParams["id"]) {
                                        return saleService.get($stateParams["id"]);
                                    } else {
                                        return $q.when(new App.Sales.Sale());   
                                    }
                                }]
                            //["$stateParams", "SaleServiceByResource", "$q",
                            // ($stateParams: ng.ui.IStateParamsService, saleService: App.Sales.ISaleServiceByResource, $q: ng.IQService):
                            //        ng.IPromise<App.Sales.ISale> => {
                            //        if ($stateParams["id"]) {
                            //            return saleService.getSaleResourceClass().get({ id: $stateParams["id"] }, (data: App.Sales.ISale) => { return data; }).$promise;
                            //        } else {
                            //            return $q.when(new App.Sales.Sale());   
                            //        }
                            //    }]
                        }

                    })
                .state("hr", <ng.ui.IState>
                    {
                        url: "/hr",
                        controller: "HumanResourceController",
                        controllerAs: "hCtrl",
                        templateUrl: "App/HumanResource/HumanResourceView.html",
                        resolve: {
                            humanResourceReportData:
                            [
                                "$stateParams", "HumanResourceService", "$q",
                                ($stateParams: ng.ui.IStateParamsService, humanResourceService: App.HumanResource.IHumanResourceService, $q: ng.IQService):
                                    ng.IPromise<App.HumanResource.HumanResourceReportData> => {
                                    return humanResourceService.get(1);
                                }]
                        }
                })
                .state("all", <ng.ui.IState>
                    {
                        url: "/all",
                        views: {
                            // the main template will be placed here (relatively named)
                            '': { templateUrl: "App/All/AllView.html" },
                            // ---------- sub-views ------------
                            "finance@all": {
                                templateUrl: "App/Finance/FinanceView.html",
                                controller: "FinanceController",
                                controllerAs: "fCtrl",
                                resolve: {
                                    financeReportData:
                                    [
                                        "$stateParams", "FinanceService", "$q",
                                        ($stateParams: ng.ui.IStateParamsService, financeService: App.Finance.IFinanceService, $q: ng.IQService):
                                            ng.IPromise<App.Finance.FinanceReportData> => {
                                            return financeService.get(1);
                                        }]
                                }
                            },
                            "project@all": {
                                templateUrl: "App/Project/ProjectView.html",
                                controller: "ProjectController",
                                controllerAs: "pCtrl",
                                resolve: {
                                    projectReportData:
                                    [
                                        "$stateParams", "ProjectService", "$q",
                                        ($stateParams: ng.ui.IStateParamsService, projectService: App.Project.IProjectService, $q: ng.IQService):
                                            ng.IPromise<App.Project.ProjectReportData> => {
                                            return projectService.get(1);
                                        }]
                                }
                            },
                            "marketing@all": {
                                templateUrl: "App/Sales/SaleView.list.html",
                                controller: "SaleController",
                                controllerAs: "sCtrl"
                            },
                            "hr@all": {
                                templateUrl: "App/HumanResource/HumanResourceView.html",
                                controller: "HumanResourceController",
                                controllerAs: "hCtrl",
                                resolve: {
                                    humanResourceReportData:
                                    [
                                        "$stateParams", "HumanResourceService", "$q",
                                        ($stateParams: ng.ui.IStateParamsService, humanResourceService: App.HumanResource.IHumanResourceService, $q: ng.IQService):
                                            ng.IPromise<App.HumanResource.HumanResourceReportData> => {
                                            return humanResourceService.get(1);
                                        }]
                                }
                            }
                        }
                    });

        }
    }
    // this is the main application module
    //
    // create a new module called "dashboardApplication" and we need to define dependency modules 
    // "ui.router" - third party router
    // "dx" - third party charts
    // "CommonServices" - our service layer
    let app = angular.module("dashboardApplication", ["ui.router", "dx", "CommonServices"]);
    //configure the ui-router
    app.config(["$stateProvider", ($stateProvider) => { return new Configuration($stateProvider); }]);

    //default route to go on the app initialization
    app.run(["$state", $state => { $state.transitionTo("all");}]);
}

