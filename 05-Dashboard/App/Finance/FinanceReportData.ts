module App.Finance {

    /**
     * Domain object for Finance Report
     */
    export class FinanceReportData {
        id: number;
        name: string;
        returnsOnSales: App.Common.CircularGaugeOptions;
        periodicalAchivement: App.Common.CircularGaugeOptions;
        securedSales: App.Common.ChartOptions;
        dueDate: Date;

        parse(response: any): void {
            this.id = response.id;
            this.name = response.name;

            this.returnsOnSales = new App.Common.CircularGaugeOptions();
            this.returnsOnSales.parse(response.returnsOnSales);

            this.periodicalAchivement = new App.Common.CircularGaugeOptions();
            this.periodicalAchivement.parse(response.periodicalAchivement);

            this.securedSales = new App.Common.ChartOptions();
            this.securedSales.parse(response.securedSales);
        }
    }
}