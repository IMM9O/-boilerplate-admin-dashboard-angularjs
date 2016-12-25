/**
 * Widget Footer Directive
 */

function rdWidgetFooter() {
    var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
}

angular.module('app').directive('rdWidgetFooter', rdWidgetFooter);
