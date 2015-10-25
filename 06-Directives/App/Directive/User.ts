module App.Directive {
    export class User {
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