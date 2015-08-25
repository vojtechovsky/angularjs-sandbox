module App.Common {

    var mockResource = angular.module("PersonResourceMock", ["ngMockE2E"]);

    mockResource.run(mockRun);
    
    mockRun.$inject = ["$httpBackend"];
    function mockRun($httpBackend: ng.IHttpBackendService) : void {
        var persons: App.Simple.IPerson[] = [];
        var person: App.Simple.IPerson;

        person = new App.Simple.Person(1, "Petr", "Vojtechovsky", new Date(1975, 2, 19));
        persons.push(person);

        person = new App.Simple.Person(2, "John", "Doe", new Date(1956, 2, 19));
        persons.push(person);

        var personUrl = "/api/persons";

        $httpBackend.whenGET(personUrl).respond(persons);

        var editingRegex = new RegExp(personUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
            var product = { "personId": 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < persons.length; i++) {
                    if (persons[i].Id == id) {
                        person = persons[i];
                        break;
                    }
                }
            }
            return [200, product, {}];
        });

        // Catch all for testing purposes
        $httpBackend.whenGET(/api/).respond(function(method, url, data) {
            return [200, persons, {}];
        });
                
        // Pass through any requests for application files
        $httpBackend.whenGET(/App/).passThrough();
    }
}
