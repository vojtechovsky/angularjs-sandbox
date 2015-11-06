module App.Directive {
    
    class DirectiveController {
        public user: User;
        public user2: User;
        public users: User[];

        static $inject = ["$state", "UserListState"];
        constructor(private $state: angular.ui.IStateService, private userListState: Blocks.IUserListState ) {
            this.user = new User("Luke Skywalker");
            this.user.friends = [new User("Biggs Darklighter"), new User("Wedge Antilles"), new User("Obi-Wan Kenobi"), new User("Yoda Loto")];
            
            let address = new Address();
            address.street = "PO BOX 123";
            address.city = "Yavin";
            address.zip = "8300";

            this.user.address = address;

            this.user2 = new User("Darth Vader");
            this.user2.friends = [new User("The Emperor"), new User("Death Star")];
            let address2 = new Address();
            address2.street = "Dark place 1";
            address2.city = "Doom";
            address2.zip = "66666";

            this.user2.address = address2;

            let lastuser = new User("Chewbacca Chewie");
            lastuser.friends = [new User("Galactic Republic"), new User("Rebel Alliance"), new User("New Republic")];
            
            this.users = [this.user, this.user2, lastuser];
        }
    }

    //get the application instance
    let module = angular.module("AppMath");

    //register a new controller
    module.controller("DirectiveController", DirectiveController);
}

