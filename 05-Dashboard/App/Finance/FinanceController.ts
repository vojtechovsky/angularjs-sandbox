module App.Finance {
    export class FinanceController {

        scope: any;
        title: string = "Ctrl is alive, no worries!";
        datasource: string;

        static $inject = ["$scope", "DevexpressService", "financeReportData"];
        constructor(private $scope: ng.IScope,
                    private service: Common.IDevexpressService,
                    private financeReportData: FinanceReportData) {

            //assign the scope
            this.scope = $scope;

            //this.scope.gaugeReturnOnSales = rosOptions;
            this.scope.gaugeReturnOnSales = service.getCircularGaugeOptions(this.financeReportData.returnsOnSales);

            //this.scope.gaugePeriodicalAchivement = achivementOptions;
            this.scope.gaugePeriodicalAchivement = service.getCircularGaugeOptions(this.financeReportData.periodicalAchivement);


            let securedSalesOptions: DevExpress.viz.charts.dxChartOptions = {
                title: {
                    text: "2.4 Mio / + 12%",
                    verticalAlignment: "bottom",
                    font: {
                        size: 30,
                        weight: 400,
                        color: "#2E75B6"
                    }
                },
                dataSource: [
                    { valueSeries1: 300000, categorySeries1: "Advisory", valueSeries2: 300000, categorySeries2: "+0%"},
                    { valueSeries1: 90000, categorySeries1: "Reporting", valueSeries2: 140000, categorySeries2: "-45%" },
                    { valueSeries1: 1600000, categorySeries1: "IT Consulting", valueSeries2: 1300000, categorySeries2: "+16%" },
                ],
                commonSeriesSettings: {
                    argumentField: "categorySeries1",
                    valueField: "valueSeries1",
                    type: "bar",
                    label: {
                        visible: true,
                        connector: { visible: true },
                        format: "largeNumber",
                        precision: 1
                    }
                },
                legend: { visible: false }, //new!
                valueAxis: [{ label: { visible: false, format: "largeNumber" } }],
                commonAxisSettings: { label: { font: { color: "#2E75B6" } } }, //new-end
                series: [
                    {
                        valueField: "valueSeries1",
                        color: "#BDD7EE",
                        valueErrorBar: {
                            lowValueField: "valueSeries2",
                            highValueField: "valueSeries2",
                            lineWidth: 2,
                            edgeLength: 100,
                            opacity: 0.8
                        }
                    }
                ]
            };

            //this.scope.chartSecuredSales = securedSalesOptions;
            let data = service.getChartOptions(this.financeReportData.securedSales);
            data.commonSeriesSettings.label = { visible: true, connector: { visible: true }, format: "largeNumber", precision: 1 };
            data.series = [
                {
                    valueField: "valueSeries1",
                    color: "#BDD7EE",
                    valueErrorBar: { lowValueField: "valueSeries2", highValueField: "valueSeries2", lineWidth: 2, edgeLength: 100, opacity: 0.8 }
                }
            ];

            this.scope.chartSecuredSales = data;
        }
    }

    let mod = angular.module("dashboardApplication");
    mod.controller("FinanceController", FinanceController);
}