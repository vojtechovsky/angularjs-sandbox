module App.Sales {

    //making interface ISale makes no benefit!
    export class Sale {
        id: number;
        name: string;
        category: string;
        volume: number;
        chance: number;
        difference: number;

        parse(response: any): void {
            //_.assign(this, response);
            //this is lodash but do i need it? -> not at the moment!
            //---------------------------------------
            //I have no glue how to bind all together
            //lodash is requested by requirejs so it loads on demand  the library
            //how to do requirejs + angular + typescript ...wow
            //therefore learn first AMD and requirejs -> use the module, use lodash
            //lodash seems to be VERY good alternative to underscore and very close to reactivejs
            //in direction of operators. I love to be able to use linq in javascript...so study!
            this.id = response.id;
            this.name = response.name;
            this.category = response.category;
            this.volume = response.volume;
            this.chance = response.chance;
            this.difference = response.difference;
        }

        public static toInstance(response: any): Sale {
            let sale = new Sale();
            sale.parse(response);
            return sale;
        }
    }
}