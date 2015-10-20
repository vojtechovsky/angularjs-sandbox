module App {


/**
 * Formats a percent value as a human readable string.
 * @param percent the value to format, 0 = 0%, 1 = 100%
 * @param decimals the number of decimals after the point
 * @param suffix the suffix to append
 */
    export function formatPercent(percent: number, decimals = 2, suffix = "%"): string {
        const multiplied = percent * 100;
        // Creates a number from the string formatting and removes any unnecessary zeros.
        const rounded = +multiplied.toFixed(decimals);

        return rounded + suffix;
    }
}