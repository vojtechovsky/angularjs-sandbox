module Blocks {

    //------------------------------------------------------
    //---                   DIRECTIVE to keep focus on element
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

                    
                $element.on("blur", (eventBlur: FocusEvent) => {
                    $log.log("blur");
                    $log.warn(eventBlur);
                    $timeout((): void => {
                        elementToFocus.focus();

                        //will evaluate to true if value is not:
                        //null
                        //undefined
                        //NaN
                        //empty string ("")
                        //false
                        if (elementToFocus.value) {
                            elementToFocus.select();
                        }

                    }, 500);
                });
            }
        };
    };


    //module.directive('selectOnFocus', function ($timeout) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, element, attrs) {
    //            var focusedElement = null;

    //            element.on('focus', function () {
    //                var self = this;
    //                if (focusedElement != self) {
    //                    focusedElement = self;
    //                    $timeout(function () {
    //                        self.select();
    //                    }, 10);
    //                }
    //            });

    //            element.on('blur', function () {
    //                focusedElement = null;
    //            });
    //        });

    //including $inject annotations
    keepFocusedDirective.$inject = ["$timeout","$log"];

    let module = angular.module("AppMath");
    module.directive("keepFocused", keepFocusedDirective);
}