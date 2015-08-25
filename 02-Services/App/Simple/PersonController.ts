module App.Simple {
    class PersonController {
        title: string;
        showImage: boolean;
        persons: App.Simple.IPerson[];

        static $inject = ["dataAccessService"];
        constructor(private dataAccessService: App.Common.DataAccessService) {
            this.title = "02 - Angular Services. Http request is mock in 'PersonResourceMock'";
            this.showImage = false;
            this.persons = [];

            var productResource = dataAccessService.getProductResource();
            productResource.query((data: App.Simple.IPerson[]) => {
                this.persons = data;
            });
        }

        toggleImage(): void {
            this.showImage = !this.showImage;
        }
    }

    //we need to register the controller to the module
    angular.module("SimpleModule")
        .controller("PersonController", PersonController);
}