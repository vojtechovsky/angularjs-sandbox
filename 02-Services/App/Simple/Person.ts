module App.Simple {
    
    //interface for Person
    export interface IPerson {
        Id: number;
        FirstName: string;
        LastName: string;
        Age: number;
        Born : Date;

    }

    //class implementaion
    export class Person implements IPerson {
        Id : number;
        FirstName: string;
        LastName: string;
        Age: number;
        Born: Date;

        calculateAge(birthday: Date): number { 
            var ageDifMs = Date.now() - birthday.getTime();
            // miliseconds from epoch
            var ageDate = new Date(ageDifMs); 
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        constructor(id: number, firstName: string, lastName: string, born: Date) {
            this.Id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Born = born;
            this.Age = this.calculateAge(this.Born);  
        }



    }
}