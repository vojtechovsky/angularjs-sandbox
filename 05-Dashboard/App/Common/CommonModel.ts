module App.Common {

    /**
     * Shared domain objects
     */
    export class ChartOptions {
        id: number;
        title: string;
        ranges: RangeChart[];

        parse(response) {
            this.id = response.id;
            this.title = response.title;
            this.ranges = response.ranges.map(RangeChart.toInstance);
        }
    }

    export class RangeChart {
        id: number;
        valueSeries1: number;
        categorySeries1: string;
        valueSeries2: number;
        categorySeries2: string;

        parse(response: any) {
            this.id = response.id;
            this.valueSeries1 = response.valueSeries1;
            this.categorySeries1 = response.categorySeries1;
            this.valueSeries2 = response.valueSeries2;
            this.categorySeries2 = response.categorySeries2;
        }

        public static toInstance(response: any): RangeChart {
            let range = new RangeChart();
            range.parse(response);
            return range;
        }
    }

    export class CircularGaugeOptions {
        id: number;
        title: string;
        scale: Scale;
        ranges: Range[];
        value: number;

        parse(response: any) {
            this.id = response.id;
            this.title = response.title;
            this.value = response.value;

            this.scale = new Scale();
            this.scale.parse(response.scale);

            this.ranges = response.ranges.map(Range.toInstance);
        }
    }

    export class Range {
        id: number;
        startValue: number;
        endValue: number;
        color: string;

        parse(response: any) {
            this.id = response.id;
            this.startValue = response.startValue;
            this.endValue = response.endValue;
            this.color = response.color;
        }

        public static toInstance(response: any): Range {
            let range = new Range();
            range.parse(response);
            return range;
        }
    }

    export class Scale {
        id: number;
        startValue: number;
        endValue: number;
        majorTick: number;
        label: string;

        parse(response: any) {
            this.id = response.id;
            this.startValue = response.startValue;
            this.endValue = response.endValue;
            this.majorTick = response.majorTick;
            this.label = response.label;
        }
    }
}