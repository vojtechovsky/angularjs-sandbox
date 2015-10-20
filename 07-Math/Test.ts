
/// <reference path="percent.ts"/>
module App {


    describe("kw-form/percent/formatPercent", () => {

        it("Multiplies the percent value with 100 and appends the suffix", () => {
            expect(formatPercent(0.33)).toBe("33%");
        });

        it("Rounds the percent value to to decimal places", () => {
            expect(formatPercent(1 / 3)).toBe("33.33%");
        });

        it("rounds the percent value to the specified number of decimal places", () => {
            expect(formatPercent(1 / 3, 4)).toBe("33.3333%");
        });

        it("uses the specified suffix", () => {
            expect(formatPercent(1 / 3, 2, "\u0025")).toBe("33.33%");
        });
    });

}