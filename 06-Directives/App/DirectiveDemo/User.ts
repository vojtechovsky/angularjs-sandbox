module App.Directive {
    export class User {
        constructor(name: string) {
            let names = name.split(" ");

            this.firstName = names[0];
            this.lastName = names[1];
        }

        firstName: string;
        lastName: string;
        address: Address;
        rank: string;
        friends: User[];
    }

    export class Address {
        street: string;
        city: string;
        zip:string;
    }
}