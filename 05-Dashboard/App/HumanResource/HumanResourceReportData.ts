module App.HumanResource {

    /**
     * Domain object for PROJECT report
     */
    export class HumanResourceReportData {
        id: number;
        name: string;
        holiday: App.Common.ChartOptions;
        flexitime: App.Common.CircularGaugeOptions;
        dueDate: Date;

        parse(response: any): void {
            this.id = response.id;
            this.name = response.name;

            this.holiday = new App.Common.ChartOptions();
            this.holiday.parse(response.holiday);

            this.flexitime = new App.Common.CircularGaugeOptions();
            this.flexitime.parse(response.flexitime);
        }
    }
}
