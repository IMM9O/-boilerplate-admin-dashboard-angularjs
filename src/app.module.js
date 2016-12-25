
(function () {
    'use strict';

    angular.module('app',
        ['satellizer',
            'ui.bootstrap',
            'ui.router',
            'ngCookies',
            'angularUtils.directives.dirPagination',
            'toaster']);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

    /**
     * Route configuration for the RDash module.
     */
    angular.module('app').config(
        ['$stateProvider',
            '$urlRouterProvider',
            '$authProvider',
            '$compileProvider',
            function ($stateProvider, $urlRouterProvider, $authProvider, $compileProvider) {
                $compileProvider.debugInfoEnabled(true);

                // Satellizer configuration that specifies which API
                // route the JWT should be retrieved from
                $authProvider.loginUrl = '/api/authenticate';

                // Redirect to the auth state if any other states
                // are requested other than users
                $urlRouterProvider.otherwise('/auth');

                // Application routes
                $stateProvider

                    .state('auth', {
                        url: '/auth',
                        template: '<auth-component><auth-component>'
                    })

                    .state('dash', {
                        url: '/dash',
                        abstract: true,
                        template: '<root-component><root-component>'
                    })

                    .state('dash.index', {
                        url: '/index',
                        templateUrl: 'templates/dashboard.html'
                    })
                    .state('dash.tables', {
                        url: '/tables',
                        templateUrl: 'templates/tables.html'
                    });
            }
        ]);
} ());
