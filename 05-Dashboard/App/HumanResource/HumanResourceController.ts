module App.Finance {
    class HumanResourceController {

        scope: any;
        title: string = "Ctrl is alive, no worries!";

        static $inject = ["$scope", "DevexpressService", "humanResourceReportData"];
        constructor(private $scope: ng.IScope,
            private service: App.Common.IDevexpressService,
            private humanResourceReportData: App.HumanResource.HumanResourceReportData) {

            this.scope = $scope;

            //this.scope.chartholidays = holidaysOptions;
            let holidays = this.service.getChartOptions(this.humanResourceReportData.holiday);
            holidays.commonSeriesSettings.type = "spline";
            holidays.series =
            [
                { valueField: "valueSeries1", name: "actualTime", point: { visible: false } },
                { valueField: "valueSeries2", name: "plannedTime", point: { visible: false }, dashStyle: "dash", color: "lightblue" }
            ];

            this.scope.chartholidays = holidays;
            
            //this.scope.gaugeFlexitime = flextimeOptions;
            let flexi = this.service.getCircularGaugeOptions(this.humanResourceReportData.flexitime);
            flexi.scale.label = { format: "decimal", customizeText() { return this.valueText + "h"; } };
            this.scope.gaugeFlexitime = flexi;
        }
    }

    let mod = angular.module("dashboardApplication");
    mod.controller("HumanResourceController", HumanResourceController);
}