module Blocks {

    //------------------------------------------------------
    //---     DIRECTIVE to keep focus on element
    //
    // * directive with own controller
    //------------------------------------------------------
    export var keepFocusedDirective = ($timeout: ng.ITimeoutService, $log: ng.ILogService): angular.IDirective => {
        return {
            restrict: "A",
            link: ($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) => {
                //check we have the right element
                if (!($element[0] instanceof HTMLInputElement)) {
                    return;
                }
                //cast the element to input
                let elementToFocus = <HTMLInputElement>$element[0];
                
                $element.on("blur", () => {

                    $timeout((): void => {
                        elementToFocus.focus();

                        $log.info("value:" + elementToFocus.value);

                        //will evaluate to true if value is not:
                        //null
                        //undefined
                        //NaN
                        //empty string ("")
                        //false
                        if (elementToFocus.value) {
                            elementToFocus.select();
                        }

                    }, 2000);
                });
            }
        };
    };

    //including $inject annotations
    keepFocusedDirective.$inject = ["$timeout","$log"];

    let module = angular.module("AppMath");
    module.directive("keepFocused", keepFocusedDirective);
}