/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */

function rdLoading() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
};


ANGULARJS_APP.directive('rdLoading', rdLoading);
