module App.Directive {
    
    class DirectiveController {
        public user: User;
        public user2: User;

        static $inject = ["$state"];
        constructor(private $state: angular.ui.IStateService) {
            this.user = new User();
            this.user.firstName = "Luke";
            this.user.lastName = "Skywalker";

            let address = new Address();
            address.street = "PO BOX 123";
            address.city = "Yavin";
            address.zip = "8300";

            this.user.address = address;

            this.user2 = new App.Directive.User();
            this.user2.firstName = "Darth";
            this.user2.lastName = "Vader";

            let address2 = new App.Directive.Address();
            address2.street = "Dark place 1";
            address2.city = "Doom";
            address2.zip = "66666";

            this.user2.address = address2;
        }
    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("DirectiveController", DirectiveController);
}

