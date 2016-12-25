(function () {
    'use strict';

    angular.module('app')
        .component('authComponent', {
            templateUrl: 'templates/authenticate.component.html',
            controller: AuthenticateController,
            controllerAs: 'auth',
        });

    AuthenticateController.$inject = ['$auth', '$state'];

    function AuthenticateController($auth, $state) {
        var vm = this;
        vm.login = login;

        function login() {
            var credentials = {
                email: vm.email,
                password: vm.password
            };
            $auth.login(credentials).then(function (data) {
                $state.go('dash.index');
            }, function (error) {
                $state.go('dash.index');
            });
        }
    }

})();
