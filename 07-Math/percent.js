var App;
(function (App) {
    /**
     * Formats a percent value as a human readable string.
     * @param percent the value to format, 0 = 0%, 1 = 100%
     * @param decimals the number of decimals after the point
     * @param suffix the suffix to append
     */
    function formatPercent(percent, decimals, suffix) {
        if (decimals === void 0) { decimals = 2; }
        if (suffix === void 0) { suffix = "%"; }
        var multiplied = percent * 100;
        // Creates a number from the string formatting and removes any unnecessary zeros.
        var rounded = +multiplied.toFixed(decimals);
        return rounded + suffix;
    }
    App.formatPercent = formatPercent;
})(App || (App = {}));
//# sourceMappingURL=percent.js.map