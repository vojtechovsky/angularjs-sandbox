module App.Project {

    /**
     * Domain object for PROJECT report
     */
    export class ProjectReportData {
        id: number;
        name: string;
        customerProject: App.Common.CircularGaugeOptions;
        researchAndDevelopment: App.Common.CircularGaugeOptions;
        education: App.Common.CircularGaugeOptions;
        dueDate: Date;

        parse(response: any): void {
            this.id = response.id;
            this.name = response.name;

            this.customerProject = new App.Common.CircularGaugeOptions();
            this.customerProject.parse(response.customerProject);

            this.researchAndDevelopment = new App.Common.CircularGaugeOptions();
            this.researchAndDevelopment.parse(response.researchAndDevelopment);

            this.education = new App.Common.CircularGaugeOptions();
            this.education.parse(response.education);
        }
    }

}