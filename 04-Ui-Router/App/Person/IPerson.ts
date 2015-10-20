module App.Person {
    /**
     * Person domain object
     */
    export interface IPerson {
        id: number;
        firstName: string;
        lastName: string;
        age: number;
        born: Date;
    }
}