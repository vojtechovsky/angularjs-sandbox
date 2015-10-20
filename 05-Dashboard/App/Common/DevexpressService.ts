module App.Common {

    export interface IDevexpressService {
        /**
         * takes the default options and apply report values
         * @param report CircularGaugeOptions
         * @returns {} 
         */
        getCircularGaugeOptions(report: App.Common.CircularGaugeOptions): DevExpress.viz.gauges.dxCircularGaugeOptions;

        /**
         * takes the default options and apply report values
         * @param report ChartOptions 
         * @returns {DevExpress.viz.charts.dxChartOptions} 
         */
        getChartOptions(report: App.Common.ChartOptions): DevExpress.viz.charts.dxChartOptions;
    }

    class DevexpressService implements IDevexpressService {

        getCircularGaugeOptions(report: App.Common.CircularGaugeOptions): DevExpress.viz.gauges.dxCircularGaugeOptions {
            let options: DevExpress.viz.gauges.dxCircularGaugeOptions = this.getDefaultDxCircularGaugeOptions();

            options.title.text = report.title;
            options.scale.startValue = report.scale.startValue;
            options.scale.endValue = report.scale.endValue;
            options.scale.majorTick.tickInterval = report.scale.majorTick;

            options.rangeContainer.ranges = report.ranges;
            options.value = report.value;

            return options;
        }

        getChartOptions(report: App.Common.ChartOptions): DevExpress.viz.charts.dxChartOptions {
            let options: DevExpress.viz.charts.dxChartOptions = this.getDefaultDxChartOptions();

            options.title.text = report.title;
            options.dataSource = report.ranges;

            return options;
        }


        getDefaultDxCircularGaugeOptions(): DevExpress.viz.gauges.dxCircularGaugeOptions {
            return {
                title: { position: "bottom-center", font: { size: 30, weight: 400, color: "#2E75B6" } },
                geometry: { startAngle: 180, endAngle: 0 },
                scale: { startValue: 0, endValue: 0.05, majorTick: { tickInterval: 0.01 }, label: { format: "percent" } },
                rangeContainer: { ranges: [] },
                valueIndicator: { color: "#2E75B6"}
            };
        }

        getDefaultDxChartOptions(): DevExpress.viz.charts.dxChartOptions {
            return {
                title: { verticalAlignment: "bottom", font: { size: 30, weight: 400, color: "#2E75B6" } },
                dataSource: [],
                commonSeriesSettings: { argumentField: "categorySeries1", valueField: "valueSeries1", type: "bar" },
                series: [{ valueField: "valueSeries1", color: "lightblue" }],
                legend: { visible: false }, //new!
                valueAxis: [{ label: { visible: false} }],
                commonAxisSettings: { label: { font: { color: "#2E75B6" } } }
            };
        }
        
    }

    //get CommonServices instance
    let commonService = angular.module("CommonServices");
    //register DevexpressService under CommonServices
    commonService.service("DevexpressService", DevexpressService);
    
}