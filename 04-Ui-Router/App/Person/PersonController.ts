module App.Person {

    export class PersonController {
        title = "PersonController demonstrate the Restfull services with Person";
        persons: IPerson[];

        static $inject = ["PersonService"];
        constructor(private personService: Person.PersonService) { }

        deletePerson(person: IPerson) {
            this.personService.getPersonResourceClass().delete({ action: "Delete", id: person.id }, (data: IPerson) => {
                var index = this.persons.indexOf(person, 0);
                if (index != undefined) {
                    this.persons.splice(index, 1);
                }
            });
        }

        updatePerson(person: IPerson) {
            this.personService.getPersonResourceClass().save({ action: "Update" }, (data: IPerson) => {

            });
        }

        loadPersons(): void {

            this.personService.getPersonResourceClass().query({action:"Read"},(data: App.Person.IPerson[]) => {
                this.persons = data;
            } );
            //first:
            //we can make anonymous function and pass it into "query"
            //this.personService.getPersonResourceClass().query( (data: App.Person.IPerson[]) => {
            //    this.persons = data;
            //} );

            //second:
            // this does not work since the "this" is not the controller
            //this.personService.getPersonResourceClass().query({action: "Read"}, this.onSuccess, this.onError );

            //onSuccess(data: App.Person.IPerson[]) {
            //    this.persons = data;
            //}
        }



        onError(data: App.Person.IPerson[]) {
            alert("Error");
        }
    }

    let module = angular.module("DemoServiceModule");

    module.controller("PersonController", PersonController);
}