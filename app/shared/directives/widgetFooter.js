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
};

ANGULARJS_APP.directive('rdWidgetFooter', rdWidgetFooter);
